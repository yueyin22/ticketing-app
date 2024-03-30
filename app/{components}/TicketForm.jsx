"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = ({ ticket }) => {
  const EDITMODE = ticket && ticket._id === "new" ? false : true;

  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent refresh
    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });

      if (!res.ok) {
        throw new Error("Failed to update Ticket");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });

      if (!res.ok) {
        throw new Error("Failed to create Ticket");
      }
    }

    router.push("/");
    router.refresh();
  };

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };

  if (EDITMODE) {
    startingTicketData["title"] = ticket?.title;
    startingTicketData["description"] = ticket?.description;
    startingTicketData["priority"] = ticket?.priority;
    startingTicketData["progress"] = ticket?.progress;
    startingTicketData["status"] = ticket?.status;
    startingTicketData["category"] = ticket?.category;
  }

  const [formData, setFormData] = useState(startingTicketData);
  return (
    <main class="w-full max-w-md mx-auto p-6">
      <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div class="text-center ">
          <h1 class="mt-3 block text-xl font-bold text-gray-800 dark:text-white">
            {EDITMODE ? "Update Ticket" : "Create Ticket"}
          </h1>
        </div>
        <div class="mt-3 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"></div>
        <div className="p-4 sm:p-7">
          {/* <!-- Form --> */}
          <form method="post" onSubmit={handleSubmit}>
            <div className="grid gap-y-4">
              {/* <!-- Form Group --> */}
              <div>
                <label for="title" className="block text-l mb-2 text-black">
                  Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="py-3 px-4 block w-full border rounded-lg text-sm text-gray-700 focus:outline-gray-200 "
                    required={true}
                    aria-describedby="title-error"
                    onChange={handleChange}
                    value={formData.title}
                  />
                  <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg
                      className="size-5 text-red-500"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                <p
                  className="hidden text-xs text-red-600 mt-2"
                  id="title-error"
                >
                  Please include a valid title
                </p>
              </div>
              <div>
                <label
                  for="description"
                  className="block text-l mb-2 text-black"
                >
                  Description
                </label>
                <div className="relative">
                  <textarea
                    id="description"
                    name="description"
                    className="py-3 px-4 block w-full border rounded-lg text-sm text-gray-700 focus:outline-gray-200 "
                    required={true}
                    aria-describedby="description-error"
                    onChange={handleChange}
                    value={formData.description}
                    rows="5"
                  />
                  <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg
                      className="size-5 text-red-500"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                <p
                  className="hidden text-xs text-red-600 mt-2"
                  id="description-error"
                >
                  Please include a valid description
                </p>
              </div>
              <div>
                <label for="category" className="block text-l mb-2 text-black">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  style={{
                    borderRadius: "0.375rem",
                    padding: "0.75rem 1rem",
                    width: "100%",
                    fontSize: "0.875rem",
                    outline: "1px solid #ccc",
                    outlineOffset: "2px",
                    color: "#333",
                  }}
                  onChange={handleChange}
                  value={formData.category}
                >
                  <option value="Hardware Problems">Hardware Problems</option>
                  <option value="Software Problems">Software Problems</option>
                  <option value="Project">Project</option>
                </select>
                <p
                  className="hidden text-xs text-red-600 mt-2"
                  id="category-error"
                >
                  Please select a category
                </p>
              </div>
              <div>
                <label for="priority" className="block text-l mb-2 text-black">
                  Priority
                </label>
                <div className="relative">
                  <input
                    type="radio"
                    id="priority-1"
                    name="priority"
                    required={true}
                    aria-describedby="priority-error"
                    onChange={handleChange}
                    value={1}
                    checked={formData.priority == 1}
                    style={{ marginRight: "0.1rem" }}
                  />
                  <label
                    className="text-gray-700"
                    style={{ paddingRight: "1rem" }}
                  >
                    1
                  </label>

                  <input
                    type="radio"
                    id="priority-2"
                    name="priority"
                    required={true}
                    aria-describedby="priority-error"
                    onChange={handleChange}
                    value={2}
                    checked={formData.priority == 2}
                    style={{ marginRight: "0.1rem" }}
                  />
                  <label
                    className="text-gray-700"
                    style={{ paddingRight: "1rem" }}
                  >
                    2
                  </label>
                  <input
                    type="radio"
                    id="priority-3"
                    name="priority"
                    required={true}
                    aria-describedby="priority-error"
                    onChange={handleChange}
                    value={3}
                    checked={formData.priority == 3}
                    style={{ marginRight: "0.1rem" }}
                  />
                  <label
                    className="text-gray-700"
                    style={{ paddingRight: "1rem" }}
                  >
                    3
                  </label>
                  <input
                    type="radio"
                    id="priority-4"
                    name="priority"
                    required={true}
                    aria-describedby="priority-error"
                    onChange={handleChange}
                    value={4}
                    checked={formData.priority == 4}
                    style={{ marginRight: "0.1rem" }}
                  />
                  <label
                    className="text-gray-700"
                    style={{ paddingRight: "1rem" }}
                  >
                    4
                  </label>
                  <input
                    type="radio"
                    id="priority-5"
                    name="priority"
                    required={true}
                    aria-describedby="priority-error"
                    onChange={handleChange}
                    value={5}
                    checked={formData.priority == 5}
                    style={{ marginRight: "0.1rem" }}
                  />
                  <label
                    className="text-gray-700"
                    style={{ paddingRight: "1rem" }}
                  >
                    5
                  </label>
                </div>
                <p
                  className="hidden text-xs text-red-600 mt-2"
                  id="priority-error"
                >
                  Please include a valid priority
                </p>
              </div>
              <div>
                <label for="progress" className="block text-l mb-2 text-black">
                  Progress
                </label>
                <input
                  type="range"
                  id="progress"
                  name="progress"
                  className="py-3 px-4 block w-full border rounded-lg text-sm text-gray-700 focus:outline-gray-200 "
                  required={true}
                  aria-describedby="progress-error"
                  onChange={handleChange}
                  value={formData.progress}
                  min="0"
                  max="100"
                />

                <p
                  className="hidden text-xs text-red-600 mt-2"
                  id="progress-error"
                >
                  Please include a progress
                </p>
              </div>
              <div>
                <label for="status" className="block text-l mb-2 text-black">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  style={{
                    borderRadius: "0.375rem",
                    padding: "0.75rem 1rem",
                    width: "100%",
                    fontSize: "0.875rem",
                    outline: "1px solid #ccc",
                    outlineOffset: "2px",
                    color: "#333",
                  }}
                  onChange={handleChange}
                  value={formData.status}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="Started">Started</option>
                  <option value="Done">Done</option>
                </select>
                <p
                  className="hidden text-xs text-red-600 mt-2"
                  id="status-error"
                >
                  Please select a status
                </p>
              </div>
              {/* <!-- End Form Group --> */}

              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                {EDITMODE ? "Update Ticket" : "Create Ticket"}
              </button>
            </div>
          </form>
          {/* <!-- End Form --> */}
        </div>
      </div>
    </main>
  );
};

export default TicketForm;
{
  /* <form>
        <div className="flex justify-center">
          <h3>Create Your Ticket</h3>
          <label></label>
        </div>
      </form> */
}
