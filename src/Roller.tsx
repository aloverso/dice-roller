import { ReactElement, useState } from "react";
import { Client } from "./domain/Client";
import { Die } from "./domain/Die";
import { Roll } from "./domain/Roll";
import { Loader } from "./Loader";
import Link from "next/link";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

interface Props {
  client: Client;
}

export const Roller = (props: Props): ReactElement => {
  const MIN = 1;
  const MAX = 99;

  const [roll, setRoll] = useState<Roll | undefined>(undefined);
  const [count, setCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingDieType, setIsLoadingDieType] = useState<Die>("d4");

  const handleClick = (die: Die): void => {
    setIsLoadingDieType(die);
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
      return <Loader dieType={loadingDieType} />;
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
        <Link className="pull-right phs" href="/history">
          roll history
        </Link>
        <Link className="pull-right phs" href="/about">
          about
        </Link>
      </div>
      <div className="row ptl">
        <h1 style={{ textIndent: "-10000px" }}>RPG Dice Roller</h1>
        <div className="col-xs-12 fdr fjc">
          <h2 style={{ textIndent: "-10000px" }}>Pick dice type to roll:</h2>
          <button onClick={(): void => handleClick("d4")}>
            <picture>
              <img className="width-100" src={"/assets/d4.svg"} alt="d4" />
            </picture>
          </button>
          <button onClick={(): void => handleClick("d6")}>
            <picture>
              <img className="width-100" src={"/assets/d6.svg"} alt="d6" />
            </picture>
          </button>
          <button onClick={(): void => handleClick("d8")}>
            <picture>
              <img className="width-100" src={"/assets/d8.svg"} alt="d8" />
            </picture>
          </button>
          <button onClick={(): void => handleClick("d10")}>
            <picture>
              <img className="width-100" src={"/assets/d10.svg"} alt="d10" />
            </picture>
          </button>
          <button onClick={(): void => handleClick("d12")}>
            <picture>
              <img className="width-100" src={"/assets/d12.svg"} alt="d12" />
            </picture>
          </button>
          <button onClick={(): void => handleClick("d20")}>
            <picture>
              <img className="width-100" src={"/assets/d20.svg"} alt="d20" />
            </picture>
          </button>
        </div>
      </div>

      <div className="row ptl">
        <h2 style={{ textIndent: "-10000px" }}>Pick number of dice to roll:</h2>
        <div className="col-xs-12 fdr fjc text-xl">
          <span className="prd">rolling</span>
          <button
            title="decrement"
            onClick={(): void => {
              if (count > MIN) setCount(count - 1);
            }}
          >
            <RemoveCircleIcon />
          </button>

          <span className="bad count">{count}</span>

          <button
            title="increment"
            onClick={(): void => {
              if (count < MAX) setCount(count + 1);
            }}
          >
            <AddCircleIcon />
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
