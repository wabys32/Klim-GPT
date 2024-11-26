import '../app/global.css';

export default function Bot() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
                <header className="relative h-20 flex justify-between items-center p-4 border-b border-gray-300">
                    <h2 className="text-black text-2xl">OsasGPT</h2>
                    <img src="/mexican-cat-un-des.gif" alt="описание" className="w-10 h-10" />
                </header>

                 {/* Вывод */}
                <main className="flex-1 p-4 bg-gray-100 overflow-y-auto max-h-96">
                    <div className="text-gray-500 text-center">Нет сообщений</div>
                </main>

                 {/* Ввод */}
                <footer className="p-4 bg-white border-t border-gray-300">
                    <form className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Введите сообщение..."
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            Отправить
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
}
