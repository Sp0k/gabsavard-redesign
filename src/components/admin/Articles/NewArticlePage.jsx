import { FiFilePlus } from "react-icons/fi"
import { TopBar } from "./TopBar"

export const NewArticlePage = () => {
  async function onSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/admin/posts/create", {
      method: "POST",
      body: new FormData(e.currentTarget),
    });

    // If server returned a redirect, follow it manually
    if (res.redirected) {
      window.location.assign(res.url);
      return;
    }

    // Otherwise show the error text
    const text = await res.text();
    alert(text);
  }

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <div className="col-span-12 p-4 mx-4 rounded border border-stone-300">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center font-medium gap-1.5">
            <FiFilePlus /> New Article
          </h3>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input 
              name="title" 
              placeholder="Title" 
              required 
              className="relative rounded border border-stone-300 p-3 text-md w-full placeholder:text-stone-400 focus:outline-none" 
            />
          </div>

          <div>
            <input 
              name="slug" 
              placeholder="Slug"
              className="relative rounded border border-stone-300 p-3 text-md w-full placeholder:text-stone-400 focus:outline-none" 
            />
            <p className="text-xs text-stone-400 mt-1">If left empty, the slug will be generated from the title.</p>
          </div>

          <div className="flex justify-center">
            <button 
              className="flex cursor-pointer transition-colors p-2 text-sm text-stone-50 hover:bg-stone-700 bg-stone-950 rounded items-center gap-2"
              type="submit"
            >
              Create draft
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

