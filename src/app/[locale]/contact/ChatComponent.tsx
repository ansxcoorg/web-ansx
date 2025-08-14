"use client";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Trash2, Send, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- Schema ---
const SEND_MESSAGE = gql`
  mutation SendMessage($sender: String!, $recipient: String!, $text: String!) {
    sendMessage(sender: $sender, recipient: $recipient, text: $text) {
      _id
      sender
      recipient
      text
      createdAt
    }
  }
`;

const GET_MESSAGES = gql`
  query GetMessages($sender: String!, $recipient: String!) {
    getMessages(sender: $sender, recipient: $recipient) {
      _id
      sender
      recipient
      text
      createdAt
    }
  }
`;

const CLEAR_MESSAGES = gql`
  mutation ClearMessages($sender: String) {
    clearMessages(sender: $sender)
  }
`;

//name string to icon add min and user chat
const initials = (name?: string) =>
  (name || "?")
    .split(" ")
    .map((s) => s.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function ChatComponent({ onClose }: { onClose: () => void }) {
  const t = useTranslations("contact");
  const [sender, setSender] = useState("");
  const [querySender, setQuerySender] = useState(""); //  query
  const [text, setText] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const greetedRef = useRef(false);

  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_MESSAGES, {
    variables: { sender: querySender, recipient: "Admin" },
    pollInterval: 3000,
    skip: !querySender, // if without input will not query
  });

  const [sendMessage, { loading: mutationLoading, error: mutationError }] =
    useMutation(SEND_MESSAGE);
  const [clearMessages, { loading: clearing }] = useMutation(CLEAR_MESSAGES, {
    refetchQueries: ["GetMessages"],
  });

  const handleClearChat = async () => {
    try {
      await clearMessages({ variables: { sender: String(querySender) } });
      greetedRef.current = false;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = async () => {
    if (!sender.trim() || !text.trim()) {
      toast.error(t("enter_message_alert"), {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    try {
      await sendMessage({
        variables: { sender: sender.trim(), recipient: "Admin", text },
      });
      setText("");
      if (!querySender) setQuerySender(sender.trim()); // submit message
    } catch (err) {
      console.error(err);
    }
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.getMessages?.length]);

  // chat box to admin greeting
  useEffect(() => {
    const msgs = data?.getMessages;
    if (!msgs || greetedRef.current) return;

    const hasAdmin = msgs.some((m: any) => m.sender === "Admin");
    const customer = msgs[0]?.sender;

    if (!hasAdmin && customer) {
      greetedRef.current = true;
      sendMessage({
        variables: {
          sender: "Admin",
          recipient: customer,
          text: "🙏 ຂອບໃຈຫຼາຍໆສໍາລັບການຕິດຕໍ່ ທີມງານໄດ້ຮັບຂໍ້ຄວາມແລ້ວ ແລະ ຈະຕອບກັບໃຫ້ໄວທີ່ສຸດເດີ້",
        },
      }).catch((e) => {
        greetedRef.current = false; //
        console.error(e);
      });
    }
  }, [data?.getMessages, sendMessage]);

  return (
    <div className="p-4 rounded-3xl border border-slate-200 bg-white/95 backdrop-blur-sm shadow-[0_6px_30px_rgba(0,0,0,0.06)] w-full max-w-md flex flex-col">
      {/* Header */}
      <div className="relative flex items-center justify-center h-12 mb-3 border-b border-slate-100 bg-white rounded-2xl">
        <button
          onClick={onClose}
          className="absolute left-2 p-2 rounded-full hover:bg-slate-100 text-slate-500"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-sm font-semibold tracking-tight text-slate-800">
          {t("chat")}
        </h3>
      </div>

      {/* Message */}
      <div className="overflow-y-auto mb-3 max-h-80 rounded-2xl p-3 bg-slate-50/70 border border-slate-100 space-y-3">
        {queryLoading && (
          <div className="text-gray-400 text-center">{t("loading")}</div>
        )}

        {data?.getMessages?.length === 0 && !queryLoading && (
          <div className="text-gray-400 text-center mt-10">
            <p>{t("no_messages")}</p>
          </div>
        )}

        {data?.getMessages?.map((msg: any) => {
          const isAdmin = msg.sender === "Admin";
          return (
            <div
              key={msg._id}
              className={`flex ${isAdmin ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`flex items-end gap-2 max-w-[82%] ${
                  isAdmin ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Avatar (text avatar) */}
                <div
                  className={`h-7 w-7 shrink-0 rounded-full grid place-items-center text-[10px] font-semibold border ${
                    isAdmin
                      ? "bg-slate-100 text-slate-600 border-slate-200" // Admin
                      : "bg-red-100 text-red-700 border-red-200" // User 
                  }`}
                  title={msg.sender}
                >
                  {initials(msg.sender)}
                </div>

                {/* Bubble */}
                <div
                  className={`rounded-2xl px-3 py-2 text-[13px] leading-relaxed shadow-sm border ${
                    isAdmin
                      ? "bg-white text-slate-800 border-slate-200" // Admin
                      : "bg-red-600 text-white border-red-600" // User 
                  }`}
                >
                  {/* name of user */}
                  <div
                    className={`text-[10px] mb-1 ${
                      isAdmin ? "text-slate-400" : "text-white/80"
                    }`}
                  >
                    {msg.sender}
                  </div>

                  {/* text message */}
                  <div className="whitespace-pre-wrap break-words">
                    {msg.text}
                  </div>

                  {/* display time */}
                  <div
                    className={`mt-1 text-[10px] text-right ${
                      isAdmin ? "text-slate-400" : "text-white/80"
                    }`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
        {queryError && (
          <p className="text-red-600 text-sm">
            Error loading messages: {queryError.message}
          </p>
        )}
      </div>

      {/* Sender */}
      <input
        type="text"
        placeholder={t("name")}
        value={sender}
        onChange={(e) => setSender(e.target.value)}
        className="border border-slate-200 px-3 py-2 mb-2 rounded-2xl text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
      />

      {/* Textarea */}
      <textarea
        placeholder={t("message")}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border border-slate-200 px-3 py-2 rounded-2xl mb-2 text-sm resize-none outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
        rows={3}
      />

      {/* Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleClearChat}
          disabled={clearing || !querySender}
          className="p-2 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white rounded-full transition disabled:opacity-50"
          title="Clear Messages"
        >
          {clearing ? (
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          ) : (
            <Trash2 className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={handleSendMessage}
          disabled={mutationLoading}
          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full disabled:opacity-50"
          title="Send Message"
        >
          {mutationLoading ? (
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>

      {mutationError && (
        <p className="text-red-600 mt-2 text-sm">
          Error sending message: {mutationError.message}
        </p>
      )}
    </div>
  );
}
