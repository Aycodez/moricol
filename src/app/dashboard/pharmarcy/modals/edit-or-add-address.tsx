"use client";

import Button from "@/components/button";
import ModalLayout from "@/components/layouts/modal-layout";
import { CancelSvg } from "@/components/svgs";
import { useState } from "react";

export default function EditOrAddAddress({
  title,
}: {
  title: "Edit" | "New" | "Add";
}) {
  const [isAddressModalOpen, setAddressModal] = useState(false);

  const closeEditModal = () => {
    setAddressModal(false);
  };

  const openEditModal = () => {
    setAddressModal(true);
  };

  return (
    <>
      {title === "Edit" ? (
        <button
          className="rounded border border-[#9F9FA0] px-5 py-2 text-xs font-bold text-[#2C2D33]"
          onClick={openEditModal}
        >
          Edit
        </button>
      ) : (
        <button
          className="rounded bg-primary-500 px-5 py-3 text-xs font-bold text-white"
          onClick={openEditModal}
        >
          Add Address
        </button>
      )}

      {isAddressModalOpen && (
        <ModalLayout>
          <article className="w-[1015px] bg-white px-12 py-5">
            <div className="mb-7 flex items-center justify-between border-b border-b-[#9F9FA0] pb-4">
              <h3 className="text-xl font-bold text-[#636985]">
                {title} Address
              </h3>
              <button
                className="rounded border border-[#CACACA] bg-[#EBEBED] p-0.5"
                onClick={closeEditModal}
              >
                <CancelSvg />
              </button>
            </div>

            <ul className="mb-7 grid gap-y-7">
              <li className="flex justify-between gap-x-6">
                <TextInput label="First Name" />
                <TextInput label="Last Name" />
              </li>
              <li className="flex justify-between gap-x-6">
                <TextInput label="Country / Region" />
                <TextInput label="State" />
              </li>
              <li>
                <TextInput label="Street Address" />
              </li>
              <li className="flex justify-between gap-x-6">
                <TextInput label="Town / City" />
                <TextInput label="Zip Code" />
              </li>
              <li className="flex justify-between gap-x-6">
                <TextInput label="Phone Number" />
                <TextInput label="Email Address" />
              </li>
            </ul>
            <div className="flex justify-end gap-x-5">
              <button
                className="w-fit rounded border border-[#9F9FA0] px-16 py-3 text-xs font-bold text-[#636985]"
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <Button className="w-fit rounded px-16 py-3 text-xs font-bold">
                Save
              </Button>
            </div>
          </article>
        </ModalLayout>
      )}
    </>
  );
}

function TextInput({ label }: { label: string }) {
  return (
    <div className="w-full">
      <label htmlFor="" className="mb-2 block text-xs text-[#636985]">
        {label}
      </label>
      <input
        type="text"
        className="w-full rounded border border-[#CECECE] bg-[#F0F0F0] px-6 py-3 text-xs text-[#6E7285]"
      />
    </div>
  );
}
