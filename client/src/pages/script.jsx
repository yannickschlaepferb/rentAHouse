export default function Script() {
  function getBackend() {
    fetch("http://localhost:3001/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 3 },
          { id: 2, quantity: 1 },
        ],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  }
  return (
    <div>
      <button
        onClick={getBackend}
        style={{
          zIndex: "9999899",
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "20px 40px",
          textAlign: "center",
          textDecoration: "none",
          display: "inline-block",
          fontSize: "20px",
          margin: "4px 2px",
          cursor: "pointer",
          borderRadius: "12px",
          width: "200px", // added width
        }}
      >
        Pay
      </button>
    </div>
  );
}
