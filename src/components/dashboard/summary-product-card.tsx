import Image from "next/image";

export default function SummaryProductCard() {
  return (
    <article className="flex items-center gap-x-4">
      <div className="relative h-[58px] w-[60px] overflow-hidden">
        <Image
          src="/images/dashboard/drug.png"
          alt=""
          fill
          sizes="60px"
          className="shrink-0"
        />
      </div>
      <div>
        <h3 className="text-xs">
          L&apos;Oréal, Revitalift Triple Power, Anti-Aging
        </h3>
        <div className="mt-3 text-xs text-gray-500">
          <p>₦344</p>
          <p>Quantity: 1</p>
        </div>
      </div>
    </article>
  );
}
