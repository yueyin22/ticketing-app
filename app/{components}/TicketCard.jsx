import { Timestamp } from "mongodb";
import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressDisplay from "./ProgressDisplay";
import StatusDisplay from "./StatusDisplay";
import Link from "next/link";

const TicketCard = ({ ticket }) => {
  const formatTimestamp = (Timestamp) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const date = new Date(Timestamp);
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  };

  return (
    <div class="group bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] ">
      <Link href={`/TicketPage/${ticket._id}`} style={{ display: "contents" }}>
        <div class="p-4 md:p-6">
          <div className="flex mb-1">
            <PriorityDisplay priority={ticket.priority} />
            <div className="ml-auto">
              <DeleteBlock id={ticket._id} />
            </div>
          </div>

          <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
            {ticket.title}
          </h3>
          <p class="mt-3 text-gray-500">{formatTimestamp(ticket.createdAt)}</p>
          <p class="mt-3 text-gray-500">{ticket.description}</p>
        </div>
        <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
          <div class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            <ProgressDisplay progress={ticket.progress} />
          </div>
          <div class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            <StatusDisplay status={ticket.status} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;
