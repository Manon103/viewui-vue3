import {
  App,
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
} from "vue";

function getScroll(target: any, top?: boolean) {
  const prop = top ? "pageYOffset" : "pageXOffset";
  const method = top ? "scrollTop" : "scrollLeft";
  let ret = target[prop];

  if (typeof ret !== "number") {
    ret = window.document.documentElement[method];
  }

  return ret;
}

function getOffset(element: any) {
  const rect = element.getBoundingClientRect();

  const scrollTop = getScroll(window, true);
  const scrollLeft = getScroll(window);

  const docEl = window.document.body;
  const clientTop = docEl.clientTop || 0;
  const clientLeft = docEl.clientLeft || 0;

  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft,
  };
}

const prefixCls = "ivu-affix";

const affixProps = () => ({
  offsetTop: {
    type: Number,
    default: 0,
  },
  offsetBottom: Number,
  useCapture: {
    type: Boolean,
    default: false,
  },
});

const Affix = defineComponent({
  name: "Affix",
  props: affixProps(),
  setup(props, { slots, emit }) {
    const { offsetBottom, offsetTop, useCapture }: any = toRefs(props); // default offset is top
    const point = ref();
    const affixRoot = ref();
    let affix = ref(false);
    let slot = ref(false);
    const state = reactive({
      styles: {},
      slotStyle: {},
    });

    const offsetType = computed(() => {
      let type = "top";
      if (offsetBottom.value >= 0) {
        type = "bottom";
      }
      return type;
    });

    const classes = computed(() => {
      return [
        {
          [`${prefixCls}`]: affix.value,
        },
      ];
    });

    onMounted(() => {
      window.addEventListener("scroll", handleScroll, useCapture);
      window.addEventListener("resize", handleScroll, useCapture);
      nextTick(() => {
        handleScroll();
      });
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll, useCapture);
      window.removeEventListener("resize", handleScroll, useCapture);
    });

    const handleScroll = () => {
      const scrollTop = getScroll(window, true);

      const elOffset = getOffset(affixRoot.value);
      const windowHeight = window.innerHeight;
      const elHeight = (affixRoot.value as HTMLElement).getElementsByTagName(
        "div"
      )[0].offsetHeight;
      // Fixed Top
      if (
        elOffset.top - offsetTop.value < scrollTop &&
        offsetType.value === "top" &&
        !affix.value
      ) {
        affix.value = true;
        state.slotStyle = {
          width: point.value.clientWidth + "px",
          height: point.value.clientHeight + "px",
        };
        slot.value = true;
        state.styles = {
          top: `${offsetTop.value}px`,
          left: `${elOffset.left}px`,
          width: `${affixRoot.value.offsetWidth}px`,
        };

        emit("on-change", true);
      } else if (
        elOffset.top - offsetTop.value > scrollTop &&
        offsetType.value == "top" &&
        affix.value
      ) {
        slot.value = false;
        state.slotStyle = {};
        affix.value = false;
        state.styles = {};

        emit("on-change", false);
      }

      // Fixed Bottom
      if (
        elOffset.top + offsetBottom.value + elHeight >
          scrollTop + windowHeight &&
        offsetType.value == "bottom" &&
        !affix.value
      ) {
        affix.value = true;
        state.styles = {
          bottom: `${offsetBottom.value}px`,
          left: `${elOffset.left}px`,
          width: `${affixRoot.value.offsetWidth}px`,
        };

        emit("on-change", true);
      } else if (
        elOffset.top + offsetBottom.value + elHeight <
          scrollTop + windowHeight &&
        offsetType.value == "bottom" &&
        affix.value
      ) {
        affix.value = false;
        state.styles = {};

        emit("on-change", false);
      }
    };

    return () => {
      return (
        <div ref={affixRoot}>
          <div ref={point} class={classes.value} style={state.styles}>
            {slots.default?.()}
          </div>
          <div v-show={slot} style={state.slotStyle}></div>
        </div>
      );
    };
  },
});

Affix.install = (app: App) => {
  app.component(Affix.name, Affix);
};

export default Affix;
