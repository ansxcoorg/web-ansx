"use client";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Trash2, Send, X } from "lucide-react";
import { useTranslations } from "next-intl";

// --- Schema (ใช้ของเดิมคุณ) ---
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

export default function ChatComponent({ onClose }: { onClose: () => void }) {
  const t = useTranslations("contact");
  const [sender, setSender] = useState("");
  const [querySender, setQuerySender] = useState(""); // ใช้ยิง query
  const [text, setText] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const greetedRef = useRef(false); // กันยิงข้อความต้อนรับซ้ำ

  const { data, loading: queryLoading, error: queryError } = useQuery(
    GET_MESSAGES,
    {
      variables: { sender: querySender, recipient: "Admin" },
      pollInterval: 3000,
      skip: !querySender, // ยังไม่กรอกชื่อ/ยังไม่ส่งข้อความครั้งแรก ก็ยังไม่ query
    }
  );

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
      alert("ກະລູນາໃສ່ຊື້ແລະຂໍ້ຄວາມ");
      return;
    }
    try {
      await sendMessage({
        variables: { sender: sender.trim(), recipient: "Admin", text },
      });
      setText("");
      if (!querySender) setQuerySender(sender.trim()); // เริ่ม subscribe ข้อความ
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
          text:
            "🙏 ຂອບໃຈຫຼາຍໆສໍາລັບການຕິດຕໍ່ ທີມງານໄດ້ຮັບຂໍ້ຄວາມແລ້ວ ແລະ ຈະຕອບກັບໃຫ້ໄວທີ່ສຸດເດີ້",
        },
      }).catch((e) => {
        greetedRef.current = false; // ถ้าพลาด ให้ยิงใหม่รอบหน้าได้
        console.error(e);
      });
    }
  }, [data?.getMessages, sendMessage]);

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white w-full max-w-md flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-gray-700">💬 {t("chat")}</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="overflow-y-auto mb-3 max-h-80 border rounded-lg p-3 bg-gray-100 space-y-2">
        {queryLoading && (
          <div className="text-gray-400 text-center">{t("loading")}</div>
        )}

        {data?.getMessages?.length === 0 && !queryLoading && (
          <div className="text-gray-400 text-center mt-10">
            <p>{t("no_messages")}</p>
          </div>
        )}

        {data?.getMessages?.map((msg: any) => (
          <div
            key={msg._id}
            className={`relative max-w-[80%] px-4 py-2 rounded-xl text-sm ${
              msg.sender === "Admin"
                ? "bg-white self-start text-gray-800 border"
                : "bg-red-600 self-end text-white ml-auto"
            }`}
          >
            <div className="font-semibold text-xs mb-1">{msg.sender}</div>
            <hr />
            <div className="break-words">{msg.text}</div>
            <div className="text-[10px] mt-1 text-gray-300 text-right">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </div>
          </div>
        ))}
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
        className="border px-3 py-2 mb-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {/* Textarea */}
      <textarea
        placeholder={t("message")}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border px-3 py-2 rounded-md mb-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
        rows={3}
      />

      {/* Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleClearChat}
          disabled={clearing || !querySender}
          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full disabled:opacity-50"
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