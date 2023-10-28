const CogIcon = ({ hoverColor }: { hoverColor: string }) => {
  return (
    <svg
      width={30}
      height={31}
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.1334 16.3438V14.6451L29.2523 12.7798C29.6428 12.4334 29.8992 11.9593 29.9759 11.4412C30.0526 10.9232 29.9449 10.3944 29.6716 9.94857L27.0672 5.50743C26.8737 5.17019 26.5954 4.89009 26.2603 4.69521C25.9252 4.50033 25.5451 4.39754 25.1581 4.39714C24.9182 4.39529 24.6796 4.43279 24.4518 4.50817L21.7701 5.4186C21.3071 5.10906 20.8242 4.83088 20.3245 4.58589L19.7616 1.78797C19.6607 1.2768 19.3843 0.817623 18.9808 0.490824C18.5773 0.164024 18.0724 -0.00957754 17.5545 0.000407953H12.3899C11.872 -0.00957754 11.3671 0.164024 10.9636 0.490824C10.5601 0.817623 10.2837 1.2768 10.1827 1.78797L9.61992 4.58589C9.11662 4.83082 8.63 5.109 8.16322 5.4186L5.53675 4.46376C5.30643 4.40338 5.06793 4.38089 4.83047 4.39714C4.44342 4.39754 4.06328 4.50033 3.72819 4.69521C3.3931 4.89009 3.11483 5.17019 2.92131 5.50743L0.316906 9.94857C0.0593204 10.3938 -0.0363973 10.9152 0.0461463 11.4237C0.12869 11.9321 0.384359 12.3958 0.769366 12.7354L2.8551 14.6562V16.3549L0.769366 18.2202C0.373484 18.5622 0.110822 19.0342 0.027992 19.5525C-0.0548377 20.0708 0.047522 20.6018 0.316906 21.0514L2.92131 25.4926C3.11483 25.8298 3.3931 26.1099 3.72819 26.3048C4.06328 26.4997 4.44342 26.6025 4.83047 26.6029C5.07033 26.6047 5.30888 26.5672 5.53675 26.4918L8.2184 25.5814C8.68139 25.8909 9.16434 26.1691 9.66407 26.4141L10.2269 29.212C10.3278 29.7232 10.6042 30.1824 11.0077 30.5092C11.4112 30.836 11.9161 31.0096 12.434 30.9996H17.6428C18.1607 31.0096 18.6656 30.836 19.0691 30.5092C19.4726 30.1824 19.749 29.7232 19.8499 29.212L20.4127 26.4141C20.916 26.1692 21.4027 25.891 21.8694 25.5814L24.5401 26.4918C24.7679 26.5672 25.0065 26.6047 25.2463 26.6029C25.6334 26.6025 26.0135 26.4997 26.3486 26.3048C26.6837 26.1099 26.962 25.8298 27.1555 25.4926L29.6716 21.0514C29.9292 20.6062 30.0249 20.0848 29.9424 19.5763C29.8598 19.0679 29.6042 18.6042 29.2192 18.2646L27.1334 16.3438ZM25.1581 24.3823L21.3728 23.0944C20.4868 23.8495 19.4741 24.4397 18.3822 24.8375L17.5987 28.8234H12.3899L11.6063 24.8819C10.5231 24.4729 9.51588 23.8836 8.62672 23.1388L4.83047 24.3823L2.22607 19.9411L5.22775 17.2765C5.0237 16.1272 5.0237 14.9506 5.22775 13.8013L2.22607 11.0589L4.83047 6.61771L8.61568 7.90564C9.50177 7.15053 10.5145 6.56026 11.6063 6.1625L12.3899 2.17657H17.5987L18.3822 6.11808C19.4654 6.52714 20.4726 7.11639 21.3618 7.86123L25.1581 6.61771L27.7625 11.0589L24.7608 13.7235C24.9648 14.8728 24.9648 16.0494 24.7608 17.1987L27.7625 19.9411L25.1581 24.3823Z"
        // fill="#263238"
        fill={hoverColor}
      />
      <path
        d="M14.994 22.1624C13.6844 22.1624 12.4042 21.7716 11.3154 21.0396C10.2265 20.3077 9.3778 19.2672 8.87664 18.05C8.37549 16.8327 8.24436 15.4932 8.49985 14.201C8.75534 12.9088 9.38596 11.7217 10.312 10.7901C11.238 9.85843 12.4178 9.22397 13.7022 8.96692C14.9866 8.70988 16.318 8.8418 17.5279 9.34601C18.7378 9.85022 19.7719 10.7041 20.4994 11.7996C21.227 12.8951 21.6154 14.1831 21.6154 15.5006C21.6242 16.3779 21.459 17.2482 21.1294 18.0605C20.7997 18.8727 20.3124 19.6107 19.6957 20.231C19.0791 20.8514 18.3456 21.3418 17.5383 21.6734C16.731 22.005 15.866 22.1713 14.994 22.1624ZM14.994 11.0595C14.4106 11.0458 13.8305 11.1513 13.2888 11.3697C12.7471 11.588 12.255 11.9147 11.8424 12.3298C11.4297 12.745 11.1051 13.24 10.8881 13.785C10.671 14.33 10.5662 14.9137 10.5797 15.5006C10.5662 16.0876 10.671 16.6712 10.8881 17.2162C11.1051 17.7612 11.4297 18.2563 11.8424 18.6714C12.255 19.0866 12.7471 19.4132 13.2888 19.6316C13.8305 19.8499 14.4106 19.9555 14.994 19.9418C15.5774 19.9555 16.1575 19.8499 16.6992 19.6316C17.2409 19.4132 17.7329 19.0866 18.1456 18.6714C18.5582 18.2563 18.8829 17.7612 19.0999 17.2162C19.3169 16.6712 19.4218 16.0876 19.4082 15.5006C19.4218 14.9137 19.3169 14.33 19.0999 13.785C18.8829 13.24 18.5582 12.745 18.1456 12.3298C17.7329 11.9147 17.2409 11.588 16.6992 11.3697C16.1575 11.1513 15.5774 11.0458 14.994 11.0595Z"
        // fill="#263238"
        fill={hoverColor}
      />
    </svg>
  );
};

export default CogIcon;