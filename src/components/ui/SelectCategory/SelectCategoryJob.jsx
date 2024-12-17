import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { arrowDown, close } from "../../../assets/images/icons";
import { t } from "i18next";
import axios from "axios";
import { useSelector } from "react-redux";
const URL = import.meta.env.VITE_REACT_APP_API_KEY;

export default function SelectCategoryJob({
  bg = "bg-[#F2F2F2]",
  className = "",
  selectName = "",
  selectLabels = [],
  preSelect = false,
  selectedValue = selectLabels[0],
  handleSelectChange = () => {},
}) {
  const { token } = useSelector((state) => state.auth);

  const [selected, setSelected] = useState(
    preSelect ? preSelect : "Select Category"
  );

  const handleChange = (value) => {
    // console.log(value);
    // setSelected(value);
    handleSelectChange(value);
  };

  const [data, setData] = useState([]);
  const handleGetCategory = async () => {
    try {
      const res = await axios.get(`${URL}/api/post/get_post_category`, {
        headers: {
          Accept: "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      setData(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleGetCategory();
  }, []);
  return (
    <div className="grid gap-1 h-fi text-black">
      <p className="capitalize tracking-wide">{selectName}</p>
      <Listbox value={selected} onChange={handleChange} required>
        <div className="relative">
          <Listbox.Button
            className={`flex justify-between items-center p-4 min-w-max rounded-2xl ${bg} ${className}`}
          >
            <p className="truncate">{t(selected)}</p>

            <img className="w-3 h-3" src={arrowDown} alt="" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-30 mt-1 w-full max-h-60 overflow-y-scroll rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {data.map((label, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none px-2 py-1 rounded-md ${
                      active ? "bg-[#7CC9D1] text-white" : "text-gray-900"
                    }`
                  }
                  onClick={() => setSelected(label?.name)}
                  value={label.id}
                >
                  {({ selected }) => (
                    <p className="flex gap-4 px-4 justify-between">
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {t(label.name)}
                      </span>
                    </p>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
