export default function AddEventForm() {
    return (
        <div   className="flex justify-center items-center"  >
        <div className="w-full max-w-4xl">
      <div className="bg-black">
            <div class="p-8 rounded border border-gray-200"> 
                <h1 class="font-medium text-3xl text-white">Добавить мероприятие</h1>
                <form>
                    <div class="mt-8 grid lg:grid-cols-2 gap-4">                       
                        <div>
                            <label for="date" class="text-sm text-gray-700 block mb-1 font-medium">date</label>
                            <input type="date" name="date" id="date" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="(01/01/2023)" />    
                        </div>
                        <div>
                            <label for="name" class="text-sm text-gray-700 block mb-1 font-medium">Название мероприятия</label>
                            <input type="text" name="name" id="name" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Название" />
                        </div>
                        <div>
                            <label for="disc" class="text-sm text-gray-700 block mb-1 font-medium">Описание</label>
                            <input type="text" name="disc" id="disc" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Описание" />
                        </div>
                        <div>
                            <label for="href" class="text-sm text-gray-700 block mb-1 font-medium">Ссылка на изображение</label>
                            <input type="text" name="href" id="href" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Ссылка" />
                        </div>

                    </div>
                    <div class="space-x-4 mt-8">
                        <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">Save</button>
                        <button class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
        </div>
    )
}