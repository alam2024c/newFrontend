import { Button, Input, Select } from "../../ui";
import { editIcon } from ".";

export default function AccountSettings() {
  return (
    <form className="grid gap-4">
      <div className="flex items-center gap-4">
        <p>{"Edit Profile"}</p>

        <button>
          <img className="w-5" src={editIcon} alt="" />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-4">
          <Input type="text" label="first name" placeholder="Devon" />

          <Input type="email" label="email" placeholder="Devonlane@gamil.com" />

          <Select
            selectLabels={["English", "العربية"]}
            preSelect
            className="w-full rounded-lg"
            selectName="language"
          />
        </div>

        <div>
          <Input type="text" label="last name" placeholder="Lane" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p>{"Edit Password"}</p>

        <button>
          <img className="w-5" src={editIcon} alt="" />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-4">
          <Input type="password" label="old password" placeholder="*******" />

          <Input type="text" label="new password" />

          <Input type="text" label="confirm password" />
        </div>

        <div></div>
      </div>

      <div className="flex sm:justify-end justify-center">
        <Button
          children="save"
          className="sm:w-fit w-full max-w-xs sm:px-8 rounded-lg"
        />
      </div>
    </form>
  );
}
