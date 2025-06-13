import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginForm() {
  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(v => console.log(v))} className="space-y-4 max-w-sm mx-auto">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Login</Button>
        <div className="flex justify-between text-sm">
          <Link to="/register" className="underline">회원이 아니신가요? 가입하기</Link>
          <Link to="#" className="underline">비밀번호 찾기</Link>
        </div>
      </form>
    </Form>
  );
}
