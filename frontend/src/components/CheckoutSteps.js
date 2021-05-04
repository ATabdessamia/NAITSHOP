import React, { useState, useEffect } from "react";
import { Steps } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Step } = Steps;

const steps = [
  {
    title: "Login",
    icon: UserOutlined,
  },
  {
    title: "Shipping",
    icon: SolutionOutlined,
  },
  {
    title: "Payement",
    icon: CreditCardOutlined,
  },
  {
    title: "Place Order",
    icon: CheckCircleOutlined,
  },
];

const CheckoutSteps = ({ History, Current }) => {
  const [current, setCurrent] = useState(+Current);
  const onChange = (current) => {
    setCurrent(current);
    if (current === 1) {
      History.push("/shipping");
    } else if (current === 0) {
      History.push("/login");
    } else if (current === 2) {
      History.push("/payment");
    } else if (current === 3) {
      History.push("/placeorder");
    }
  };

  return (
    <Steps
      current={current}
      onChange={onChange}
      size="default"
      className="mb-5 mt-10"
    >
      {steps.map((item, i) => (
        <Step
          key={item.title}
          title={window.screen.width < "532" ? "" : item.title}
          icon={<item.icon />}
          disabled={current < i && true}
        />
      ))}
    </Steps>
  );
};

export default CheckoutSteps;
