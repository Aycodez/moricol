import Button from "@/components/button";
import SummaryProductCard from "@/components/dashboard/summary-product-card";
import { LocationSVG, OneUserSvg, PhoneSVG } from "@/components/svgs";
import { routes } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import EditOrAddAddress from "../modals/edit-or-add-address";

export default function Checkout() {
  return (
    <main className="px-8 py-6 pb-20">
      <section className="mb-9">
        <div className="flex items-center justify-between border-b border-[#D2D2D2] pb-3">
          <h1 className="shrink-0 text-lg font-semibold text-primary-500">
            Checkout
          </h1>
        </div>
      </section>

      <div className="flex items-start gap-x-8">
        <section className="grow">
          <section className="mb-9">
            <div className="flex items-center justify-between border-b border-[#D2D2D2] pb-3">
              <h2 className="shrink-0 font-semibold text-primary-500">
                Billing
              </h2>
            </div>
            <div className="mb-4 flex items-start justify-between py-5">
              <div>
                <p className="mb-1.5 flex items-center gap-x-1 text-xs text-gray-500">
                  <OneUserSvg /> C Darl Uzu
                </p>
                <p className="mb-1.5 flex items-center gap-x-1 text-xs text-gray-500">
                  <LocationSVG fill={"#E29A13"} className="h-4 w-4" /> Court
                  Estate, Durumi | Federal Capital Territory - ABUJA- DURUMI |
                  900103
                </p>
                <p className="flex items-center gap-x-1 text-xs text-gray-500">
                  <PhoneSVG /> +234 7035286570
                </p>
              </div>
              <Button
                className="w-fit py-2.5 text-xs font-bold"
                variant="outline"
              >
                Change
              </Button>
            </div>

            <article className="max-w-[320px] rounded border border-gray-300 p-5 text-xs space-y-3">
              <p>Click on Add Address to add a new address</p>
              {/* <Button className="mt-3 w-fit">Add Address</Button> */}
              <EditOrAddAddress title="Add" />
            </article>
          </section>
          <section className="mb-9">
            <div className="flex items-center justify-between border-b border-[#D2D2D2] pb-3">
              <h2 className="shrink-0 font-semibold text-primary-500">
                Delivery Address
              </h2>
            </div>
            <div className="mb-4 flex items-start justify-between py-5">
              <div>
                <p className="mb-1.5 flex items-center gap-x-1 text-xs text-gray-500">
                  <OneUserSvg /> C Darl Uzu
                </p>
                <p className="mb-1.5 flex items-center gap-x-1 text-xs text-gray-500">
                  <LocationSVG fill={"#E29A13"} className="h-4 w-4" /> Court
                  Estate, Durumi | Federal Capital Territory - ABUJA- DURUMI |
                  900103
                </p>
                <p className="flex items-center gap-x-1 text-xs text-gray-500">
                  <PhoneSVG /> +234 7035286570
                </p>
              </div>
              <Button
                className="w-fit py-2.5 text-xs font-bold"
                variant="outline"
              >
                Change
              </Button>
            </div>

            <article className="max-w-[320px] rounded border border-gray-300 p-5 text-xs">
              <p>Click on Add Address to add a new address</p>
              <Button className="mt-3 w-fit">Add Address</Button>
            </article>
          </section>
          <section>
            <div className="mb-6 flex items-center justify-between border-b border-[#D2D2D2] pb-3">
              <h2 className="shrink-0 font-semibold text-primary-500">
                Payment Options
              </h2>
            </div>

            <div className="flex items-center gap-x-2">
              <input type="radio" id="paystack" />
              <label htmlFor="paystack" className="flex items-center gap-x-0.5">
                <div className="relative h-3.5 w-3.5 overflow-hidden">
                  <Image
                    src="/images/paystack.png"
                    alt=""
                    fill
                    sizes="14px"
                    className="h-auto w-3.5"
                  />
                </div>
                PayStack
              </label>
            </div>

            {/* <div className="mt-3.5 flex items-center gap-x-2">
              <input type="radio" id="paystack" />
              <label htmlFor="paystack" className="flex items-center gap-x-0.5">
                <div className="relative h-3.5 w-3.5 overflow-hidden">
                  <Image
                    src="/images/flutter.png"
                    alt=""
                    fill
                    sizes="14px"
                    className="h-auto w-3.5"
                  />
                </div>
                Flutterwave
              </label>
            </div> */}
          </section>
        </section>
        <section className="grid w-[372px] shrink-0 gap-y-2">
          <h2 className="shrink-0 font-semibold text-primary-500">
            Order Summary
          </h2>

          <article className="rounded border border-[#9F9FA0] bg-gray-100">
            <div className="grid gap-y-5 px-5 py-6">
              <SummaryProductCard />
              <SummaryProductCard />
            </div>

            <div className="gap-y-2.5 border-y border-y-gray-300 px-6 py-6 text-primary-500">
              <p className="flex justify-between">
                Subtotal <span>₦1,374</span>
              </p>
              <p className="flex justify-between">
                Delivery Fees <span>₦210</span>
              </p>
            </div>
            <div className="px-5 py-6">
              <p className="flex justify-between font-bold text-primary-500">
                Total <span>₦210</span>
              </p>
            </div>
          </article>
          <article className="rounded border border-[#9F9FA0] bg-gray-100">
            <p className="px-5 py-3 text-xs">
              Have a coupon?{" "}
              <span className="text-primary-500">
                Click here to enter your code
              </span>
            </p>
          </article>
          <article className="rounded border border-[#9F9FA0] p-5 text-xs">
            <p className="mb-2.5">
              If you have a coupon code, please apply it below.
            </p>
            <input
              type="text"
              placeholder="Coupon Code"
              className="mb-3 w-full rounded border bg-gray-100 px-5 py-3"
            />
            <Button
              variant="outline"
              className="w-fit py-2.5 text-xs font-bold"
            >
              Apply Coupon
            </Button>
          </article>
          <Link
            href={routes.PHARMARCYPAYMENT}
            className="inline-block rounded-lg bg-primary-500 py-3 text-center font-semibold text-white"
          >
            Place Order
          </Link>
        </section>
      </div>
    </main>
  );
}
