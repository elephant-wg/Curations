import { useState, useEffect } from "react";
import { supabase } from "../pages/api/supabase";

function UnconfirmedLink({ onShowModal }) {
  const [data, setData] = useState([]);

  function handleClick() {
    onShowModal();
    console.log("button in table clicked");
  }

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("unconfirmed_links")
        .select("*");
      if (error) console.log(error);
      else setData(data);
    }
    fetchData();
  }, []);

  async function handleEdit(id) {
    // Fetch the item you want to edit
    const { data: item, error } = await supabase
      .from("unconfirmed_links")
      .select("*")
      .eq("id", id)
      .single();
    if (error) console.log(error);

    // Show a form to edit the item
    const newName = prompt("Enter a new name", item.name);
    const newDescription = prompt("Enter a new description", item.description);

    // Update the item in the curations database
    const { error: updateError } = await supabase
      .from("curations")
      .insert([
        { created_at: item.timestamp, link: item.link, name: item.newName },
      ])
      .eq("id", id);
    if (updateError) console.log(updateError);

    // Delete the item from the unconfirmed_links database
    const { error: deleteError } = await supabase
      .from("unconfirmed_links")
      .delete()
      .eq("id", id);
    if (deleteError) console.log(deleteError);

    // Fetch the updated data and update the state
    const { data: updatedData, error: fetchError } = await supabase
      .from("unconfirmed_links")
      .select("*");
    if (fetchError) console.log(fetchError);
    else setData(updatedData);
  }

  async function handleDelete(id) {
    // Delete the item from the database
    const { error } = await supabase
      .from("unconfirmed_links")
      .delete()
      .eq("id", id);
    if (error) console.log(error);

    // Fetch the updated data and update the state
    const { data: updatedData, error: fetchError } = await supabase
      .from("unconfirmed_links")
      .select("*");
    if (fetchError) console.log(fetchError);
    else setData(updatedData);
  }

  return (
    // <div className="flex-column justify-center items-start">
    //   {data.map((item) => (
    //     <div key={item.id} className="flex flex-row gap-x-4 mb-4">
    //       <p>{item.timestamp}</p>
    //       <p>{item.link}</p>
    //       <button onClick={() => handleEdit(item.id)}>Edit</button>
    //       <button onClick={() => handleDelete(item.id)}>Delete</button>
    //     </div>
    //   ))}
    // </div>

    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200">
            <table className="table-fixed divide-y divide-zinc-800">
              <thead className="sticky top-0 bg-black-80">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-200 uppercase tracking-wider"
                  >
                    Timestamp
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-200 uppercase tracking-wider"
                  >
                    Link
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-200 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-black-100 divide-y divide-zinc-800">
                {data.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-500">
                      {item.timestamp}
                    </td>
                    <td className="max-w-lg px-6 py-4 whitespace-nowrap truncate text-sm text-zinc-500">
                      {item.link}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => (handleClick())}
                        className="text-zinc-600 hover:text-zinc-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="ml-4 text-zinc-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnconfirmedLink;