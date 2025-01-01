import TransactionTable from "./transactionTable";

export default function TransactionPage() {
  return (
    <div className="container px-1 md:px-10 mx-auto">
      <div className="title text-black text-2xl font-semibold">
        <h2>Lịch sử giao dịch</h2>
      </div>
      <div className="mt-5 bg-white p-2 shadow-lg rounded-md">
        <div className="flex flex-1 justify-between mb-2 gap-3">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">Danh sách giao dịch</h2>
          </div>
        </div>
        <TransactionTable />
      </div>
    </div>
  )
}
