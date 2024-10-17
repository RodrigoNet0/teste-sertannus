function Header(){
    return (
        <>
        <header>
            <nav className="flex justify-between items-center p-4 bg-gray-100">
                <div className="flex items-center">
                    <img src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Workflow" className="h-8 w-auto" />
                </div>
                <div className="flex items-center space-x-4">
                    <a href="#" className="text-gray-500 hover:text-gray-700">Inventário</a>
                    <a href="#" className="text-gray-500 hover:text-gray-700">Adicionar item</a>
                </div>
            </nav>
        </header>
        </>
    )
}
export default Header