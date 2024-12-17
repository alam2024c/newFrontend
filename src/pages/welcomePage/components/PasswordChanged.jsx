import { illustration } from ".";
import { Button } from "../../../components/ui";

export default function PasswordChanged() {
  return (
    <div className="absolute w-screen h-screen z-30 bg-[#0099AB]">
      <div className="flex flex-col gap-8 h-full max-w-md m-auto justify-center items-center text-white">
        <img src={illustration} alt="" />

        <p className="text-lg">{"Password changed"}</p>

        <p className="text-sm pb-4">
          {"Your password has been changed successfully"}
        </p>

        <Button
          children="Go back to login"
          className="w-full bg-white text-[#0099AB] capitalize rounded-lg"
        />
      </div>
    </div>
  );
}
