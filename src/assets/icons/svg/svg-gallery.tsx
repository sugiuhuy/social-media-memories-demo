import { Component, Match, Switch } from "solid-js";
import { twMerge } from "tailwind-merge";
import { SvgProps } from "~/assets/icons";

const SvgGallery: Component<SvgProps> = (props) => {
  return (
    <Switch>
      <Match when={props.typeGallery === "all" || !props.typeGallery}>
        <svg width="100%" height="100%" viewBox="0 0 16 14" fill="none" class={twMerge("aspect-square size-full", props.class)}>
          <path
            d="M14.0645 6.78805C13.9949 7.30623 13.5374 7.66726 13.0426 7.59444C12.5478 7.52161 12.2031 7.0425 12.2727 6.52432C12.3422 6.00614 12.7997 5.6451 13.2945 5.71793C13.7893 5.79076 14.134 6.26986 14.0645 6.78805Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.51066 6.2904C8.07063 5.83227 7.93084 4.90791 7.26309 4.65341L4.16511 3.47268C3.51724 3.22577 2.85429 3.79812 2.96214 4.51125L3.46216 7.8175C3.57001 8.53063 4.3694 8.86042 4.9127 8.41592L7.51066 6.2904ZM4.54139 7.91816L7.13935 5.79264C7.32601 5.63993 7.27941 5.33181 7.05683 5.24698L3.95884 4.06625C3.74289 3.98394 3.5219 4.17473 3.55785 4.41244L4.05788 7.71868C4.09383 7.9564 4.36029 8.06633 4.54139 7.91816Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.78716 1.28455C0.800146 1.44827 0.126743 2.41894 0.28307 3.45261L1.22659 9.69134C1.38292 10.725 2.30978 11.4302 3.29679 11.2665L5.59678 10.885L5.58645 10.962C5.44737 11.9984 6.13685 12.9566 7.12644 13.1022L13.0991 13.9813C14.0887 14.127 15.0037 13.4049 15.1428 12.3685L15.9822 6.11352C16.1213 5.07715 15.4318 4.11894 14.4422 3.97329L10.0342 3.3245L9.8145 1.87162C9.65817 0.837951 8.73131 0.132717 7.7443 0.296434L1.78716 1.28455ZM10.1329 3.97688L10.758 8.11035C10.8184 8.50976 10.7549 8.89977 10.5974 9.23745L11.3395 10.2688C11.5399 10.5474 11.9181 10.6031 12.1841 10.3932L14.1864 8.81299C14.3195 8.70801 14.5085 8.73584 14.6088 8.87515C14.709 9.01445 14.6824 9.21247 14.5494 9.31744L12.5471 10.8976C12.0151 11.3175 11.2587 11.2062 10.8578 10.649L10.2264 9.77152C9.96865 10.0321 9.63462 10.2153 9.25393 10.2784L7.23892 10.6126L7.04642 10.7645C6.91694 10.8667 6.73434 10.8431 6.63227 10.7133L6.21972 10.7817L6.18372 11.0499C6.091 11.7408 6.55065 12.3796 7.21038 12.4767L13.1831 13.3558C13.8428 13.4529 14.4528 12.9715 14.5455 12.2806L15.3849 6.02561C15.4776 5.3347 15.018 4.69589 14.3583 4.59879L10.1329 3.97688ZM7.83865 0.920307L1.88151 1.90842C1.2235 2.01757 0.774566 2.66468 0.878784 3.35379L1.8223 9.59252C1.92652 10.2816 2.54443 10.7518 3.20244 10.6426L9.15958 9.65453C9.81758 9.54538 10.2665 8.89827 10.1623 8.20916L9.21878 1.97043C9.11456 1.28132 8.49666 0.811163 7.83865 0.920307Z"
            fill="currentColor"
          />
        </svg>
      </Match>
      <Match when={props.typeGallery !== "all"}>
        <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={twMerge("aspect-square size-full", props.class)}>
          <Switch>
            <Match when={props.typeGallery === "addReaction"}>
              <path
                d="M6 0C2.68629 0 0 2.68629 0 6V10C0 13.3137 2.68629 16 6 16H10C13.3137 16 16 13.3137 16 10V6H15V10C15 12.7614 12.7614 15 10 15H6C3.23858 15 1 12.7614 1 10V6C1 3.23858 3.23858 1 6 1H10V0H6Z"
                fill="currentColor"
              />
              <path
                d="M11 6C10.4477 6 10 6.44771 10 7C10 7.55228 10.4477 8 11 8C11.5523 8 12 7.55228 12 7C12 6.44771 11.5523 6 11 6Z"
                fill="currentColor"
              />
              <path
                d="M5 8C5.55228 8 6 7.55228 6 7C6 6.44771 5.55228 6 5 6C4.44771 6 4 6.44771 4 7C4 7.55228 4.44771 8 5 8Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.12702 10C4.04286 9.67408 4 9.3381 4 9H12C12 9.3381 11.9571 9.67408 11.873 10C11.8264 10.1804 11.7671 10.3578 11.6955 10.5307C11.4945 11.016 11.1999 11.457 10.8284 11.8284C10.457 12.1999 10.016 12.4945 9.53073 12.6955C9.04543 12.8965 8.52529 13 8 13C7.47471 13 6.95457 12.8965 6.46927 12.6955C5.98396 12.4945 5.54301 12.1999 5.17157 11.8284C4.80014 11.457 4.5055 11.016 4.30448 10.5307C4.23285 10.3578 4.17361 10.1804 4.12702 10ZM10.7716 10.1481C10.7919 10.0992 10.8108 10.0498 10.8284 10H5.17157C5.18917 10.0498 5.20811 10.0992 5.22836 10.1481C5.37913 10.512 5.6001 10.8427 5.87868 11.1213C6.15726 11.3999 6.48797 11.6209 6.85195 11.7716C7.21593 11.9224 7.60603 12 8 12C8.39397 12 8.78407 11.9224 9.14805 11.7716C9.51203 11.6209 9.84274 11.3999 10.1213 11.1213C10.3999 10.8427 10.6209 10.512 10.7716 10.1481Z"
                fill="currentColor"
              />
              <path
                d="M13.5 0.5C13.5 0.223858 13.2761 0 13 0C12.7239 0 12.5 0.223858 12.5 0.5V2.5H10.5C10.2239 2.5 10 2.72386 10 3C10 3.27614 10.2239 3.5 10.5 3.5H12.5V5.5C12.5 5.77614 12.7239 6 13 6C13.2761 6 13.5 5.77614 13.5 5.5V3.5H15.5C15.7761 3.5 16 3.27614 16 3C16 2.72386 15.7761 2.5 15.5 2.5H13.5V0.5Z"
                fill="currentColor"
              />
            </Match>
            <Match when={props.typeGallery === "collections"}>
              <path
                d="M2.1875 3.5C2.42912 3.5 2.625 3.30412 2.625 3.0625C2.625 2.82088 2.42912 2.625 2.1875 2.625C1.94588 2.625 1.75 2.82088 1.75 3.0625C1.75 3.30412 1.94588 3.5 2.1875 3.5Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.80557 4.375C1.76875 4.23241 1.75 4.08542 1.75 3.9375H5.25C5.25 4.08542 5.23125 4.23241 5.19443 4.375C5.17405 4.45394 5.14813 4.53154 5.11679 4.6072C5.02884 4.81952 4.89994 5.01243 4.73744 5.17494C4.57493 5.33744 4.38202 5.46634 4.1697 5.55429C3.95738 5.64224 3.72981 5.6875 3.5 5.6875C3.27019 5.6875 3.04262 5.64224 2.8303 5.55429C2.61798 5.46634 2.42507 5.33744 2.26256 5.17494C2.10006 5.01243 1.97116 4.81952 1.88321 4.6072C1.85187 4.53154 1.82595 4.45394 1.80557 4.375ZM4.71259 4.43977C4.72145 4.41838 4.72974 4.39678 4.73744 4.375H2.26256C2.27026 4.39678 2.27855 4.41838 2.28741 4.43977C2.35337 4.59901 2.45005 4.7437 2.57192 4.86558C2.6938 4.98745 2.83849 5.08413 2.99773 5.15009C3.15697 5.21605 3.32764 5.25 3.5 5.25C3.67236 5.25 3.84303 5.21605 4.00227 5.15009C4.16151 5.08413 4.3062 4.98745 4.42808 4.86558C4.54995 4.7437 4.64663 4.59901 4.71259 4.43977Z"
                fill="currentColor"
              />
              <path
                d="M4.8125 3.5C5.05412 3.5 5.25 3.30412 5.25 3.0625C5.25 2.82088 5.05412 2.625 4.8125 2.625C4.57088 2.625 4.375 2.82088 4.375 3.0625C4.375 3.30412 4.57088 3.5 4.8125 3.5Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.625 0C1.17525 0 0 1.17525 0 2.625V4.375C0 5.82475 1.17525 7 2.625 7H4.375C5.82475 7 7 5.82475 7 4.375V2.625C7 1.17525 5.82475 0 4.375 0H2.625ZM4.375 0.4375H2.625C1.41688 0.4375 0.4375 1.41688 0.4375 2.625V4.375C0.4375 5.58312 1.41688 6.5625 2.625 6.5625H4.375C5.58312 6.5625 6.5625 5.58312 6.5625 4.375V2.625C6.5625 1.41688 5.58312 0.4375 4.375 0.4375Z"
                fill="currentColor"
              />
              <path
                d="M14.375 12C14.0298 12 13.75 12.2798 13.75 12.625C13.75 12.9702 14.0298 13.25 14.375 13.25C14.7202 13.25 15 12.9702 15 12.625C15 12.2798 14.7202 12 14.375 12Z"
                fill="currentColor"
              />
              <path
                d="M11.875 12.625C11.875 12.2798 12.1548 12 12.5 12C12.8452 12 13.125 12.2798 13.125 12.625C13.125 12.9702 12.8452 13.25 12.5 13.25C12.1548 13.25 11.875 12.9702 11.875 12.625Z"
                fill="currentColor"
              />
              <path
                d="M10 12.625C10 12.2798 10.2798 12 10.625 12C10.9702 12 11.25 12.2798 11.25 12.625C11.25 12.9702 10.9702 13.25 10.625 13.25C10.2798 13.25 10 12.9702 10 12.625Z"
                fill="currentColor"
              />
              <path
                d="M11.625 3.0625C11.625 3.30412 11.4291 3.5 11.1875 3.5C10.9459 3.5 10.75 3.30412 10.75 3.0625C10.75 2.82088 10.9459 2.625 11.1875 2.625C11.4291 2.625 11.625 2.82088 11.625 3.0625Z"
                fill="currentColor"
              />
              <path
                d="M13.8125 3.5C14.0541 3.5 14.25 3.30412 14.25 3.0625C14.25 2.82088 14.0541 2.625 13.8125 2.625C13.5709 2.625 13.375 2.82088 13.375 3.0625C13.375 3.30412 13.5709 3.5 13.8125 3.5Z"
                fill="currentColor"
              />
              <path
                d="M12.9375 4.59375C12.9375 4.95619 12.7416 5.25 12.5 5.25C12.2584 5.25 12.0625 4.95619 12.0625 4.59375C12.0625 4.23131 12.2584 3.9375 12.5 3.9375C12.7416 3.9375 12.9375 4.23131 12.9375 4.59375Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9 2.625C9 1.17525 10.1753 0 11.625 0H13.375C14.8247 0 16 1.17525 16 2.625V4.375C16 5.82475 14.8247 7 13.375 7H11.625C10.1753 7 9 5.82475 9 4.375V2.625ZM11.625 0.4375H13.375C14.5831 0.4375 15.5625 1.41688 15.5625 2.625V4.375C15.5625 5.58312 14.5831 6.5625 13.375 6.5625H11.625C10.4169 6.5625 9.4375 5.58312 9.4375 4.375V2.625C9.4375 1.41688 10.4169 0.4375 11.625 0.4375Z"
                fill="currentColor"
              />
              <path
                d="M2.1875 12.5C2.42912 12.5 2.625 12.3041 2.625 12.0625C2.625 11.8209 2.42912 11.625 2.1875 11.625C1.94588 11.625 1.75 11.8209 1.75 12.0625C1.75 12.3041 1.94588 12.5 2.1875 12.5Z"
                fill="currentColor"
              />
              <path
                d="M5.25 12.0625C5.25 12.3041 5.05412 12.5 4.8125 12.5C4.57088 12.5 4.375 12.3041 4.375 12.0625C4.375 11.8209 4.57088 11.625 4.8125 11.625C5.05412 11.625 5.25 11.8209 5.25 12.0625Z"
                fill="currentColor"
              />
              <path d="M1.75 13.375V13.8125H5.25V13.375H1.75Z" fill="currentColor" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.625 9C1.17525 9 0 10.1753 0 11.625V13.375C0 14.8247 1.17525 16 2.625 16H4.375C5.82475 16 7 14.8247 7 13.375V11.625C7 10.1753 5.82475 9 4.375 9H2.625ZM6.5625 11.625C6.5625 10.4169 5.58312 9.4375 4.375 9.4375H2.625C1.41688 9.4375 0.4375 10.4169 0.4375 11.625V13.375C0.4375 14.5831 1.41688 15.5625 2.625 15.5625H4.375C5.58312 15.5625 6.5625 14.5831 6.5625 13.375V11.625Z"
                fill="currentColor"
              />
            </Match>
            <Match when={props.typeGallery === "picture"}>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 3C0 1.34315 1.34315 0 3 0H13C14.6569 0 16 1.34315 16 3V13C16 14.6569 14.6569 16 13 16H3C1.34315 16 0 14.6569 0 13V3ZM14.3536 7.64645C14.5488 7.84171 14.5488 8.15829 14.3536 8.35355L11.4142 11.2929C10.6332 12.0739 9.36684 12.0739 8.58579 11.2929L6.70711 9.41421C6.31658 9.02369 5.68342 9.02369 5.29289 9.41421L2.35355 12.3536C2.15829 12.5488 1.84171 12.5488 1.64645 12.3536C1.45118 12.1583 1.45118 11.8417 1.64645 11.6464L4.58579 8.70711C5.36684 7.92606 6.63317 7.92606 7.41421 8.70711L9.29289 10.5858C9.68342 10.9763 10.3166 10.9763 10.7071 10.5858L13.6464 7.64645C13.8417 7.45118 14.1583 7.45118 14.3536 7.64645ZM11.5 6C12.3284 6 13 5.32843 13 4.5C13 3.67157 12.3284 3 11.5 3C10.6716 3 10 3.67157 10 4.5C10 5.32843 10.6716 6 11.5 6Z"
                fill="currentColor"
              />
            </Match>
            <Match when={props.typeGallery === "reaction"}>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4 9C4 9.3381 4.04286 9.67408 4.12702 10C4.17361 10.1804 4.23285 10.3578 4.30448 10.5307C4.5055 11.016 4.80014 11.457 5.17157 11.8284C5.54301 12.1999 5.98396 12.4945 6.46927 12.6955C6.95457 12.8965 7.47471 13 8 13C8.52529 13 9.04543 12.8965 9.53073 12.6955C10.016 12.4945 10.457 12.1999 10.8284 11.8284C11.1999 11.457 11.4945 11.016 11.6955 10.5307C11.7671 10.3578 11.8264 10.1804 11.873 10C11.9571 9.67408 12 9.3381 12 9H4ZM10.8284 10C10.8108 10.0498 10.7919 10.0992 10.7716 10.1481C10.6209 10.512 10.3999 10.8427 10.1213 11.1213C9.84274 11.3999 9.51203 11.6209 9.14805 11.7716C8.78407 11.9224 8.39397 12 8 12C7.60603 12 7.21593 11.9224 6.85195 11.7716C6.48797 11.6209 6.15726 11.3999 5.87868 11.1213C5.6001 10.8427 5.37913 10.512 5.22836 10.1481C5.20811 10.0992 5.18917 10.0498 5.17157 10H10.8284Z"
                fill="currentColor"
              />
              <path
                d="M6 7C6 7.55228 5.55228 8 5 8C4.44771 8 4 7.55228 4 7C4 6.44771 4.44771 6 5 6C5.55228 6 6 6.44771 6 7Z"
                fill="currentColor"
              />
              <path
                d="M11 8C11.5523 8 12 7.55228 12 7C12 6.44771 11.5523 6 11 6C10.4477 6 10 6.44771 10 7C10 7.55228 10.4477 8 11 8Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 6C0 2.68629 2.68629 0 6 0H10C13.3137 0 16 2.68629 16 6V10C16 13.3137 13.3137 16 10 16H6C2.68629 16 0 13.3137 0 10V6ZM6 1H10C12.7614 1 15 3.23858 15 6V10C15 12.7614 12.7614 15 10 15H6C3.23858 15 1 12.7614 1 10V6C1 3.23858 3.23858 1 6 1Z"
                fill="currentColor"
              />
            </Match>
            <Match when={props.typeGallery === "video"}>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 4C0 1.79086 1.79086 0 4 0L4.8 4H0ZM5.8 4L5 0H10L10.8 4H5.8ZM12 5H11H6H5H0V12C0 14.2091 1.79086 16 4 16H12C14.2091 16 16 14.2091 16 12V5H12ZM11.8 4L11 0H12C14.2091 0 16 1.79086 16 4H11.8ZM6.5 13.0981L11 10.5L6.5 7.90192L6.5 13.0981Z"
                fill="currentColor"
              />
            </Match>
          </Switch>
        </svg>
      </Match>
    </Switch>
  );
};

export default SvgGallery;
