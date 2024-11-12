import { LocationSVG, PhoneSVG, SingleUserSvg } from "@/components/svgs";
import EditOrAddAddress from "../../modals/edit-or-add-address";

export default function Addresses() {
  return (
    <section className="rounded border border-gray-300">
      <div className="border-b border-gray-300 pt-5">
        <h2 className="inline-block border-b-2 border-b-primary-500 px-6 pb-5 font-semibold text-primary-500">
          Addresses
        </h2>
      </div>

      <ul className="grid gap-y-10 px-8 py-10">
        <li>
          <Address />
        </li>
        <li className="border-t border-t-[#9F9FA0] pt-8">
          <EditOrAddAddress title="New" />
        </li>
      </ul>
    </section>
  );
}

function Address() {
  return (
    <article>
      <h3 className="mb-5 border-b border-b-[#9F9FA0] pb-3.5 text-xs font-bold text-primary-500">
        Address 1
      </h3>
      <div className="flex items-center justify-between">
        <div className="grid gap-y-1.5 text-xs text-[#636985]">
          <p className="flex items-center gap-x-1 font-bold">
            <span className="flex h-3.5 w-3.5 items-center justify-center">
              <SingleUserSvg />
            </span>
            C Darl Uzu
          </p>
          <p className="flex items-center gap-x-1">
            <span className="flex h-3.5 w-3.5 items-center justify-center">
              <LocationSVG fill="#E29A13" className="h-4 w-4" />
            </span>
            Court Estate, Durumi | Federal Capital Territory - ABUJA- DURUMI |
            900103
          </p>
          <p className="flex items-center gap-x-1">
            <span className="flex h-3.5 w-3.5 items-center justify-center">
              <PhoneSVG />
            </span>
            +234 7035286570
          </p>
        </div>
        <EditOrAddAddress title="Edit" />
      </div>
    </article>
  );
}
