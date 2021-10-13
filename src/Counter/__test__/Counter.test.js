import React from "react";
import Counter from "../Counter";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// fireEvents is used to trigger specific events for our test cases

let getByTestId;
beforeEach(() => {
  const component = render(<Counter />);
  getByTestId = component.getByTestId;
});

afterEach(() => {
  cleanup();
});

test("header renders with correct text", () => {
  const headerEle = getByTestId("header");

  expect(headerEle.textContent).toBe("My Counter");
});

test("counter initially starts with a text of 0", () => {
  const counterEle = getByTestId("counter");

  expect(counterEle.textContent).toBe("0");
});

test("input contains initial value of 1", () => {
  const inputEle = getByTestId("input");

  expect(inputEle.value).toBe("1");
});

test("add button renders with +", () => {
  const addBtn = getByTestId("add-btn");

  expect(addBtn.textContent).toBe("+");
});

test("subtract button renders with -", () => {
  const subtractBtn = getByTestId("subtract-btn");

  expect(subtractBtn.textContent).toBe("-");
});

test("change value of input works correctly", () => {
  const inputEle = getByTestId("input");

  expect(inputEle.value).toBe("1");

  fireEvent.change(inputEle, {
    target: {
      value: "5",
    },
  });

  expect(inputEle.value).toBe("5");
});

test("clicking on + button adds 1 to counter", () => {
  const addBtn = getByTestId("add-btn");
  const counterEle = getByTestId("counter");

  fireEvent.click(addBtn);
  expect(counterEle.textContent).toBe("1");
});

test("clicking on - button subtract 1 to counter", () => {
  const subtractBtn = getByTestId("subtract-btn");
  const counterEle = getByTestId("counter");

  fireEvent.click(subtractBtn);
  expect(counterEle.textContent).toBe("-1");
});

test("changing input value then clicking on add button works correctly", () => {
  const addBtn = getByTestId("add-btn");
  const counterEle = getByTestId("counter");
  const inputEle = getByTestId("input");

  fireEvent.change(inputEle, {
    target: {
      value: "5",
    },
  });

  fireEvent.click(addBtn);
  expect(counterEle.textContent).toBe("5");
});

test("changing input value then clicking on subtract button works correctly", () => {
  const subtractBtn = getByTestId("subtract-btn");
  const counterEle = getByTestId("counter");
  const inputEle = getByTestId("input");

  fireEvent.change(inputEle, {
    target: {
      value: "5",
    },
  });

  fireEvent.click(subtractBtn);
  expect(counterEle.textContent).toBe("-5");
});

test("adding and then subtracting leads to the correct counter number", () => {
  const addBtn = getByTestId("add-btn");
  const subtractBtn = getByTestId("subtract-btn");
  const counterEle = getByTestId("counter");
  const inputEle = getByTestId("input");

  fireEvent.change(inputEle, {
    target: {
      value: "10",
    },
  });

  fireEvent.click(addBtn);
  expect(counterEle.textContent).toBe("10");

  fireEvent.click(addBtn);
  expect(counterEle.textContent).toBe("20");

  fireEvent.click(addBtn);
  expect(counterEle.textContent).toBe("30");

  fireEvent.click(addBtn);
  expect(counterEle.textContent).toBe("40");

  fireEvent.click(subtractBtn);
  expect(counterEle.textContent).toBe("30");

  fireEvent.click(subtractBtn);
  expect(counterEle.textContent).toBe("20");

  fireEvent.change(inputEle, {
    target: {
      value: "5",
    },
  });

  fireEvent.click(addBtn);
  expect(counterEle.textContent).toBe("25");

  fireEvent.click(subtractBtn);
  expect(counterEle.textContent).toBe("20");
});

test("counter contains correct className", () => {
  const counterEl = getByTestId("counter");
  const inputEle = getByTestId("input");
  const addBtn = getByTestId("add-btn");
  const subtractBtn = getByTestId("subtract-btn");

  expect(counterEl.className).toBe("");

  fireEvent.change(inputEle, {
    target: {
      value: "50",
    },
  });

  fireEvent.click(addBtn);
  expect(counterEl.className).toBe("");

  fireEvent.click(addBtn);
  expect(counterEl.className).toBe("green");

  fireEvent.click(addBtn);
  expect(counterEl.className).toBe("green");

  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);
  expect(counterEl.className).toBe("");

  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);

  expect(counterEl.className).toBe("red");
});
