import { Component } from "solid-js";
import { twMerge } from "tailwind-merge";
import { SvgProps } from "~/assets/icons";

const SvgMention: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={twMerge("aspect-square size-full", props.class)}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.1451 1.74957C10.7696 0.837367 9.13161 0.404376 7.48501 0.517708C5.83841 0.631041 4.27518 1.28437 3.03762 2.37642C1.80006 3.46847 0.957292 4.93826 0.639947 6.55796C0.322602 8.17765 0.548404 9.8568 1.28235 11.3351C2.0163 12.8135 3.21741 14.0084 4.69949 14.7347C6.18158 15.4611 7.86187 15.6782 9.47991 15.3525C9.75063 15.298 9.92591 15.0344 9.87142 14.7637C9.81693 14.493 9.5533 14.3177 9.28259 14.3722C7.88029 14.6544 6.42404 14.4662 5.13956 13.8368C3.85509 13.2073 2.81413 12.1717 2.17804 10.8904C1.54195 9.60923 1.34626 8.15397 1.62129 6.75023C1.89632 5.34649 2.62672 4.07268 3.69927 3.12623C4.77182 2.17979 6.12663 1.61357 7.55368 1.51535C8.98073 1.41713 10.4003 1.79239 11.5924 2.58296C12.7845 3.37353 13.6826 4.53526 14.1473 5.88808C14.6118 7.24007 14.6176 8.70744 14.1639 10.063L13.721 11.3389C13.4891 12.0068 12.6743 12.2557 12.1087 11.8316C12.0403 11.7802 12 11.6996 12 11.6141V4.5H11V5.35418C10.2671 4.52376 9.19469 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C9.19469 12 10.2671 11.4762 11 10.6458V11.6141C11 12.0144 11.1885 12.3914 11.5087 12.6316C12.6162 13.4622 14.2117 12.9746 14.6657 11.6668L15.1095 10.3884L15.1112 10.3833C15.6357 8.81837 15.6294 7.12412 15.0931 5.56317C14.5568 4.00223 13.5206 2.66177 12.1451 1.74957ZM11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11C9.65685 11 11 9.65685 11 8Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SvgMention;
