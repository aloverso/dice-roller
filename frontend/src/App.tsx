import React, { ReactElement, useState } from "react";
import { Client } from "./domain/Client";
import { Link, RouteComponentProps } from "@reach/router";
import d4 from "./assets/d4.svg";
import d6 from "./assets/d6.svg";
import d8 from "./assets/d8.svg";
import d10 from "./assets/d10.svg";
import d12 from "./assets/d12.svg";
import d20 from "./assets/d20.svg";
import { Die } from "./domain/Die";
import { Roll } from "./domain/Roll";
import { Icon } from "@material-ui/core";
import { Loader } from "./Loader";

interface Props extends RouteComponentProps {
  client: Client;
}

export const App = (props: Props): ReactElement => {
  const MIN = 1;
  const MAX = 99;

  const [roll, setRoll] = useState<Roll | undefined>(undefined);
  const [count, setCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = (die: Die): void => {
    setIsLoading(true);
    props.client.rollDie(die, count, {
      onSuccess: (roll: Roll) => {
        setIsLoading(false);
        setRoll(roll);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  const displayTotalOrLoader = (): ReactElement => {
    if (isLoading) {
      return <Loader />;
    } else if (roll) {
      return (
        <div>
          <h1 className="align-center text-xxl text-white">{roll.total}</h1>
          {roll.rolls.length > 1 && (
            <div className="ptd text-m align-center">{roll.rolls.join(" + ")}</div>
          )}
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="container">
      <div className="row mts">
        <Link className="pull-right phs" to="/history">
          roll history
        </Link>
        <Link className="pull-right phs" to="/about">
          about
        </Link>
      </div>
      <div className="row ptl">
        <div className="col-xs-12 fdr fjc">
          <button onClick={(): void => handleClick("d4")}>
            <img className="width-100" src={d4} alt="d4" />
          </button>
          <button onClick={(): void => handleClick("d6")}>
            <img className="width-100" src={d6} alt="d6" />
          </button>
          <button onClick={(): void => handleClick("d8")}>
            <img className="width-100" src={d8} alt="d8" />
          </button>
          <button onClick={(): void => handleClick("d10")}>
            <img className="width-100" src={d10} alt="d10" />
          </button>
          <button onClick={(): void => handleClick("d12")}>
            <img className="width-100" src={d12} alt="d12" />
          </button>
          <button onClick={(): void => handleClick("d20")}>
            <img className="width-100" src={d20} alt="d20" />
          </button>
        </div>
      </div>

      <div className="row ptl">
        <div className="col-xs-12 fdr fjc text-xl">
          <span className="prd">rolling</span>
          <button
            title="decrement"
            onClick={(): void => {
              if (count > MIN) setCount(count - 1);
            }}
          >
            <Icon>remove_circle</Icon>
          </button>

          <span className="bad count">{count}</span>

          <button
            title="increment"
            onClick={(): void => {
              if (count < MAX) setCount(count + 1);
            }}
          >
            <Icon>add_circle</Icon>
          </button>
          <span className="pld">{count > 1 ? "dice" : "die"}</span>
        </div>
      </div>

      <div className="row ptl">
        <div className="col-xs-12 fdr fjc fac">{displayTotalOrLoader()}</div>
      </div>
    </div>
  );
};
