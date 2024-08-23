export default function NotFound() {
    return (
        <div className="grid h-screen px-4 bg-white place-content-center font-sans">
            <div className="text-center">
                <h1 className="font-black text-gray-200 text-9xl">400</h1>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Bad Request!</p>

                <p className="mt-4 text-gray-500">Có lỗi xảy ra, vui lòng thử lại sau</p>

                <button
                    type="button"
                    className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
                >
                    <a className="w-full h-full font-sans text-inherit" href="/">
                        Trở lại trang chủ
                    </a>
                </button>
            </div>
        </div>
    );
}
