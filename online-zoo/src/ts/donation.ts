class Donation {
  constructor() {
    const input = document.getElementById("amount") as HTMLInputElement;

    input.addEventListener("input", () => {
      let len: number = input.value.length;
      if (len >= 4) {
        input.value = input.value.slice(0, 4);
      }
    });
  }
}

const donation = new Donation();
