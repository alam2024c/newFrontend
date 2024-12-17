import { Button, Input } from "../../../components/ui";

export default function forgetPassword() {
  return (
    <form className="flex flex-col justify-center items-center gap-5 mb-28">
      <div className="grid pb-8 gap-3">
        <p className="text-lg">
          {"Forgot password"}
          {"?"}
        </p>
        <p className="text-xs max-w-md">
          {
            "Don't worry! It happens. Please enter the email associated with your account."
          }
        </p>
      </div>

      <Input
        label="email"
        inputID="email"
        type="text"
        name="email"
        className="w-full"
        placeholder={"Email"}
        // value={email}
        required={true}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button className="w-full rounded-lg" children="send code" />
    </form>
  );
}
