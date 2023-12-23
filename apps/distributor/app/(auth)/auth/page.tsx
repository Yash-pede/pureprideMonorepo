"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/shadCnComponents";
import { LoginForm, SignInForm } from "@repo/ui/components";

const AuthComponent = () => {
  return (
    <div className="w-full space-y-5">
      <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="SignUp">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="SignUp">
          <SignInForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthComponent;
