export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ✅ Submission Successful!
        </h1>
        <p className="text-gray-600">Your details have been validated.</p>
      </div>
    </div>
  );
}
