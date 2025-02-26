// app/loading.js
const Loading = () => {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="text-6xl animate-spin">
          🍕
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-700">
          Carregando...
        </h1>
      </div>
    );
  };
  
  export default Loading;