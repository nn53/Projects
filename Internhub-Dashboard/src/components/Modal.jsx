import Button from "./Button";

export default function Modal({
  title,
  onClose,
  onSave,
  children,
  saveText = "Save",
  cancelText = "Cancel",
}) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto px-6 py-6">
        {/* Modal Heading */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-[#F59E0B]">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-xl leading-none">
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div>{children}</div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300"
          >
            {cancelText}
          </button>
          <Button type="button" onClick={onSave} className="text-sm">
            {saveText}
          </Button>
        </div>
      </div>
    </div>
  );
}