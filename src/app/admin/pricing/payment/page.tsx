"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const paymentMethods = [
  {
    id: "credit",
    title: "Credit/Debit Card",
    description: "Pay with Visa, MasterCard",
    icon: "/image/1.png",
  },
  {
    id: "va",
    title: "Virtual Account",
    description: "Pay with Briva, Bniva, or other",
    icon: "/image/2.png",
  },
  {
    id: "bank",
    title: "ATM/Bank Transfer",
    description: "Pay with BCA, BNI, Mandiri, BRI",
    icon: "/image/3.png",
  },
  {
    id: "qris",
    title: "QRIS",
    description: "Pay with QRIS",
    icon: "/image/4.png",
  },
  {
    id: "ewallet",
    title: "E-Wallet",
    description: "Pay with Gopay, Shopeepay, or other",
    icon: "/image/5.png",
  },
  {
    id: "retail",
    title: "Retail Outlet",
    description: "Pay in cash at Alfamart or Indomaret",
    icon: "/image/6.png",
  },
  {
    id: "debit",
    title: "Direct Debit",
    description: "Authorize automatic payment from your bank account",
    icon: "/image/7.png",
  },
  {
    id: "creditless",
    title: "Cardless Credit",
    description: "Pay with Kredivo or Akulaku",
    icon: "/image/8.png",
  },
];

export default function PaymentPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedVA, setSelectedVA] = useState<string | null>(null);
  const [showVAInstructions, setShowVAInstructions] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [nameOnCard, setNameOnCard] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<{
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    nameOnCard?: string;
    agree?: string;
  }>({});
  function generateBRIVA() {
    const prefix = "88888";
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000); // 10 digit
    return prefix + randomNumber;
  }

  // Get payment details from URL params
  const searchParams = useSearchParams();
  const [totalAmount, setTotalAmount] = useState(34000); // default value
  const [packageName, setPackageName] = useState("Premium");
  const [numEmployees, setNumEmployees] = useState(2);
  const [billingPeriod, setBillingPeriod] = useState("single");

  useEffect(() => {
    const total = searchParams.get("total");
    const pkg = searchParams.get("package");
    const employees = searchParams.get("employees");
    const billing = searchParams.get("billing");

    if (total) setTotalAmount(parseInt(total));
    if (pkg) setPackageName(decodeURIComponent(pkg));
    if (employees) setNumEmployees(parseInt(employees));
    if (billing) setBillingPeriod(billing);
  }, [searchParams]);

  const renderDetails = () => {
    if (!selected) {
      return (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-400 text-center">
            Please select a payment method to view detailed instructions
          </p>
        </div>
      );
    }

    const method = paymentMethods.find((m) => m.id === selected);

    if (selected === "credit") {
      const handleSubmit = () => {
        const newErrors: typeof errors = {};
        if (!cardNumber.trim())
          newErrors.cardNumber = "Card number is required";
        if (!expiryDate.trim())
          newErrors.expiryDate = "Expiry date is required";
        if (!cvv.trim()) newErrors.cvv = "CVV is required";
        if (!nameOnCard.trim()) newErrors.nameOnCard = "Name is required";
        if (!agree) newErrors.agree = "You must agree to the terms";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
          setShowSuccess(true);
        }
      };

      return (
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold">
            Configure your credit card or debit card
          </h2>

          <div className="flex gap-2">
            <Image src="/image/visa.png" alt="Visa" width={40} height={24} />
            <Image
              src="/image/mc.png"
              alt="MasterCard"
              width={40}
              height={24}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Card number"
              value={cardNumber}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "").substring(0, 16);
                const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ");
                setCardNumber(formatted);
              }}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">{errors.cardNumber}</p>
            )}
          </div>

          <div className="flex gap-2">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "").substring(0, 4);
                  if (value.length > 2) {
                    value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
                  }
                  setExpiryDate(value);
                }}
                className="w-full border px-4 py-2 rounded"
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm">{errors.expiryDate}</p>
              )}
            </div>

            <div className="w-1/2">
              <input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, "")
                    .substring(0, 3);
                  setCvv(value);
                }}
                className="w-full border px-4 py-2 rounded"
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm">{errors.cvv}</p>
              )}
            </div>
          </div>

          <div>
            <input
              type="text"
              placeholder="Name on card"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.nameOnCard && (
              <p className="text-red-500 text-sm">{errors.nameOnCard}</p>
            )}
          </div>

          <div className="flex justify-between items-center border px-4 py-2 rounded">
            <span>Total Amount</span>
            <span className="font-semibold">
              Rp {totalAmount.toLocaleString()}
            </span>
          </div>

          <p className="text-xs text-gray-500">
            Your payment will be processed securely. Additional charges or fees
            may apply depending on your bank or payment provider.
          </p>
          <p className="text-xs text-gray-500">
            By checking the box below, you agree to our{" "}
            <a href="#" className="text-blue-600 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 underline">
              Privacy Policy
            </a>
            , and confirm that you are at least 18 years old. The selected
            payment method will be charged a one-time amount of Rp{" "}
            {totalAmount.toLocaleString()}.
          </p>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label htmlFor="agree" className="text-sm">
              I agree.
            </label>
          </div>
          {errors.agree && (
            <p className="text-red-500 text-sm">{errors.agree}</p>
          )}

          <button
            className="w-full bg-blue-900 text-white py-2 rounded font-semibold hover:bg-blue-800 transition"
            onClick={handleSubmit}
          >
            Confirm Payment
          </button>
        </div>
      );
    }

    if (selected === "va") {
      const vaOptions = [
        {
          id: "briva",
          name: "BRI Virtual Account",
          icon: "/image/briva.png",
        },
        {
          id: "bcava",
          name: "BCA Virtual Account",
          icon: "/image/bcava.png",
        },
        {
          id: "bniva",
          name: "BNI Virtual Account",
          icon: "/image/bniva.png",
        },
      ];

      const selectedOption = vaOptions.find((va) => va.id === selectedVA);

      return (
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold">Configure your virtual account</h2>

          <div className="space-y-2 relative">
            <label className="font-semibold block mb-1">
              Virtual Account Bank
            </label>

            {/* Trigger Dropdown */}
            <button
              onClick={() =>
                setSelectedVA(selectedVA === "dropdown" ? null : "dropdown")
              }
              className="w-full flex justify-between items-center border px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              <span>
                {selectedOption
                  ? selectedOption.name
                  : "Select virtual account bank"}
              </span>
              <span className="text-gray-500 text-sm">&#9662;</span>
            </button>

            {/* Dropdown Options */}
            {selectedVA === "dropdown" && (
              <div className="absolute z-10 w-full bg-white shadow rounded mt-1 border divide-y">
                {vaOptions.map((va) => (
                  <div
                    key={va.id}
                    onClick={() => setSelectedVA(va.id)}
                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={va.icon}
                        alt={va.name}
                        width={28}
                        height={28}
                      />
                      <span>{va.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center border px-4 py-2 rounded">
            <span>Total Amount</span>
            <span className="font-semibold">
              Rp {totalAmount.toLocaleString()}
            </span>
          </div>

          <p className="text-xs text-gray-500">
            Your payment will be processed securely. Additional charges or fees
            may apply depending on your bank or payment provider.
          </p>
          <p className="text-xs text-gray-500">
            By checking the box below, you agree to our{" "}
            <a href="#" className="text-blue-600 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 underline">
              Privacy Policy
            </a>
            . The selected payment method will be charged a one-time amount of
            Rp {totalAmount.toLocaleString()}.
          </p>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="agree" />
            <label htmlFor="agree" className="text-sm">
              I agree.
            </label>
          </div>

          <button
            className="w-full bg-blue-900 text-white py-2 rounded font-semibold hover:bg-blue-800 transition"
            onClick={() => {
              if (selectedVA === "briva") {
                setShowVAInstructions(true);
              } else {
                setShowSuccess(true);
              }
            }}
          >
            Confirm Payment
          </button>
        </div>
      );
    }

    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{method?.title}</h2>
        <p className="text-gray-600 mb-4">{method?.description}</p>
        <div className="border rounded p-4 text-sm text-gray-700 bg-white">
          Please follow the instruction provided here for {method?.title}.
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex h-screen bg-white">
        {/* Payment List */}
        <div className="w-1/2 border-r p-6 overflow-y-auto">
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelected(method.id)}
                className={`flex items-center justify-between p-4 border rounded cursor-pointer hover:bg-gray-100 transition ${
                  selected === method.id ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={method.icon}
                    alt={method.title}
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                  <div>
                    <p className="font-semibold">{method.title}</p>
                    <p className="text-sm text-gray-500">
                      {method.description}
                    </p>
                  </div>
                </div>
                <span className="text-xl text-gray-400">&gt;</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Details */}
        <div className="w-1/2 p-6">{renderDetails()}</div>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-[#5D5D5D]/70 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-sm overflow-visible">
            {/* Bagian Hijau Atas */}
            <div className="bg-green-600 rounded-t-lg pt-12 pb-6 text-white text-center relative">
              {/* Icon Success */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <Image
                  src="/image/success.png"
                  alt="Success"
                  width={80}
                  height={80}
                  className="rounded-full shadow-lg"
                />
              </div>
              <h2 className="text-2xl font-bold">Success!</h2>
            </div>

            {/* Bagian Putih Bawah */}
            <div className="p-6 text-center">
              <p className="text-sm text-gray-700 mb-6">
                we are delighted to inform you
                <br />
                that we received your payment
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      {showVAInstructions && (
        <div className="fixed inset-0 bg-[#5D5D5D]/70 flex items-center justify-center z-50">
          <div className="relative bg-[#C9C9C9] border border-[#B0B0B0] rounded-lg w-[90%] max-w-xl overflow-visible p-4 space-y-4">
            {/* Kotak 1 */}
            <div className="bg-white rounded-md p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Image
                  src="/image/clock_briva.png"
                  alt="Clock"
                  width={50}
                  height={50}
                />
                <div>
                  <div className="text-black font-semibold">
                    Please pay before
                  </div>
                  <p className="text-[#999999] text-sm">
                    09 Jun 2025 12:30 WIB
                  </p>
                </div>
              </div>

              <hr className="border-t border-[#999999]" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#999999] text-sm">
                    Virtual Account Number
                  </p>
                  <p className="text-black font-bold tracking-wider text-lg">
                    {generateBRIVA()}
                  </p>
                </div>
                <Image
                  src="/image/briva.png"
                  alt="BRIVA"
                  width={40}
                  height={40}
                />
              </div>

              <div>
                <p className="text-[#999999] text-sm">Total Amount</p>
                <p className="text-black text-lg font-bold">
                  Rp {totalAmount.toLocaleString()}
                </p>
              </div>

              <p className="text-[#999999] text-xs border-t pt-4">
                • Virtual Account transfers can only be made from the bank you
                selected
                <br />• Your transaction will only be processed after your
                payment is successfully verified
              </p>
            </div>

            {/* Kotak 2 */}
            <div className="bg-white rounded-md p-4">
              <h3 className="text-black text-base font-semibold mb-2">
                Payment Instructions
              </h3>

              <details className="text-sm mb-2">
                <summary className="cursor-pointer font-semibold text-black">
                  Via BRI ATM
                </summary>
                <ol className="list-decimal list-inside mt-2 space-y-1 text-sm text-[#999999]">
                  <li>Insert your BRI Debit Card and enter your PIN</li>
                  <li>
                    Select the menu: Other Transactions &gt; Payment &gt; Others
                    &gt; BRIVA
                  </li>
                  <li>
                    Enter the 5-digit company code (80777) and your phone number
                  </li>
                  <li>Make sure the payment details are correct</li>
                  <li>Follow the instructions to complete the transaction</li>
                  <li>Keep the transaction receipt as proof of payment</li>
                </ol>
              </details>

              <details className="text-sm">
                <summary className="cursor-pointer font-semibold text-black">
                  Via BRI Mobile Banking
                </summary>
                <ol className="list-decimal list-inside mt-2 space-y-1 text-sm text-[#999999]">
                  <li>Log in to the BRI Mobile app</li>
                  <li>Select Mobile Banking BRI &gt; Payment &gt; BRIVA</li>
                  <li>Enter the company code and your phone number</li>
                  <li>Enter the payment amount</li>
                  <li>Enter your PIN</li>
                  <li>Save the SMS notification as proof of payment</li>
                </ol>
              </details>
            </div>

            <button
              onClick={() => {
                setShowVAInstructions(false);
                setShowFailed(true);
              }}
              className="w-full bg-blue-900 text-white py-2 rounded font-semibold hover:bg-blue-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showFailed && (
        <div className="fixed inset-0 bg-[#5D5D5D]/70 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-sm overflow-visible">
            {/* Bagian Merah Atas */}
            <div className="bg-red-600 rounded-t-lg pt-12 pb-6 text-white text-center relative">
              {/* Icon Failed */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <Image
                  src="/image/failed.png"
                  alt="Failed"
                  width={80}
                  height={80}
                  className="rounded-full shadow-lg"
                />
              </div>
              <h2 className="text-2xl font-bold">Failed!!!</h2>
            </div>

            {/* Bagian Putih Bawah */}
            <div className="p-6 text-center">
              <p className="text-sm text-gray-700 mb-6">
                Unfortunately we have an issue
                <br />
                with your payment, try again later.
              </p>
              <button
                onClick={() => setShowFailed(false)}
                className="bg-red-600 text-white px-6 py-2 rounded font-semibold hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
