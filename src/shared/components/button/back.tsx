import { useNavigate } from "@solidjs/router";
import { ParentComponent } from "solid-js";

interface Props {
  class: string;
  disabled?: boolean;
}

const ButtonBack: ParentComponent<Props> = (props) => {
  const navigate = useNavigate();

  const onBackPage = () => {
    if (window.history.length > 0) return window.history.back();
    navigate("/", { replace: true });
  };

  return (
    <button type="button" class={props.class} disabled={props.disabled} on:click={onBackPage}>
      {props.children}
    </button>
  );
};

export default ButtonBack;
