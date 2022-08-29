import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useState, useRef } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import {
  TextInput,
  PasswordInput,
  Autocomplete,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Loader,
  Stack,
} from "@mantine/core";

import { GoogleButton, FacebookButton } from "./SocialButtons";

export function AuthenticationForm(props) {
  const provider = new GoogleAuthProvider();
  const navigateTo = useNavigate();

  const signUp = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        localStorage.setItem("user", JSON.stringify(user));
        navigateTo("/jobs");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const timeoutRef = useRef(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const handleChange = (val) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setData([]);
    form.setFieldValue("email", val);

    if (val.trim().length === 0 || val.includes("@")) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(
          ["gmail.com", "outlook.com", "yahoo.com"].map(
            (provider) => `${val}@${provider}`
          )
        );
      }, 100);
    }
  };
  return (
    <Paper radius="md" p="xl" {...props}>
      <Group grow mb="md" mt="md">
        <GoogleButton onClick={signUp} radius="xl">
          Sign In With Google
        </GoogleButton>
      </Group>

      <Divider
        labelProps={{
          size: "md",
        }}
        label="Or continue with email"
        labelPosition="center"
        my="lg"
      />

      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              size="lg"
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
            />
          )}

          <Autocomplete
            required
            label="Email"
            value={value}
            size="lg"
            data={data}
            placeholder="Your email"
            // onChange={(event) =>
            //   form.setFieldValue("email", event.currentTarget.value)
            // }
            onChange={handleChange}
            rightSection={loading ? <Loader size={16} /> : null}
            error={form.errors.email && "Invalid email"}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            size="lg"
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
          />

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="md"
            className="font-sans text-md"
          >
            {type === "register"
              ? "Already have an account?"
              : "Don't have an account?"}
            {type === "register" ? (
              <span className="font-serif text-blue-700 ml-2">Login</span>
            ) : (
              <span className="font-serif text-blue-700 ml-2">Register</span>
            )}
          </Anchor>
          <Button className="bg-blue-600" type="submit">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
