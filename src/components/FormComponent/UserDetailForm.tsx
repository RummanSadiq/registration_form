import { FormEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Custom Component
import FormHeader from "./FormHeader";
import FormButton from "./FormButtons";

// UI
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

// Store
import { useFormStore } from "@/store/store";

// Constant
import { FormSection } from "@/shared/constant";

export default function UserDetailForm() {
  // Hooks
  const userDetail = useFormStore((state) => state.formInfo.userDetail);
  const setUserDetail = useFormStore((state) => state.setUserDetail);
  const setFormSections = useFormStore((state) => state.setFormSection);

  // Vars
  const { name, email, password } = userDetail;

  const formSchema = z.object({
    name: z
      .string({
        message: "Only alphabets are allowed, e.g., A-Z, a-z.",
      })
      .min(1, { message: "Name is required" }),
    email: z
      .string()
      .email({ message: "It is not a valid email address" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      )
      .min(1, { message: "Password is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      email,
      password,
    },
  });

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    const newValue = {
      ...userDetail,
      [name]: value,
    };
    setUserDetail(newValue);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setFormSections(FormSection.ProfileInfo);
  };

  return (
    <div className="flex flex-col gap-10">
      <FormHeader
        heading={"User Detail"}
        description="Please insert your user details"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-2 gap-4">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      {...field}
                      className="focus:border-none"
                      onChangeCapture={(event: FormEvent<HTMLInputElement>) =>
                        handleChange(event)
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    {"This name will be displayed on your profile."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="johndoe@example.com"
                      {...field}
                      className="focus:border-none"
                      onChangeCapture={(event: FormEvent<HTMLInputElement>) =>
                        handleChange(event)
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    {"This is the email we will use to contact you."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="focus:border-none"
                      onChangeCapture={(event: FormEvent<HTMLInputElement>) =>
                        handleChange(event)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormButton />
        </form>
      </Form>
    </div>
  );
}
