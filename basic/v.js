const Carouselhook = React.forwardRef((uncontrolledProps, ref) => {
    const {
        as: Component = "div",
        bsPrefix,
        slide,
        fade,
        indicators,
        controls,
        wrap,
        touch,
        prevIcon,
        prevLabel,
        nextIcon,
        nextLabel,
        className,
        children,
        keyboard,
        activeIndex: activeIndexProp,
        pauseOnHover,
        interval,
        onSelect,
        onSlideEnd,
        ...props
    } = useUncontrolled(uncontrolledProps, { activeIndex: "onSelect" });

    const prefix = useBootstrapPrefix(bsPrefix, "carousel");

    const [prevClasses, setPrevClasses] = useState("");
    const [currentClasses, setCurrentClasses] = useState("active");
    const [activeIndex, setActiveIndex] = useState(activeIndexProp);
    const [previousActiveIndex, setPreviousActiveIndex] = useState(null);
    const [direction, setDirection] = useState("");

    const didMount = useRef(); //
    const isUnmounted = useRef(false); //
    const _isPaused = useRef(false); //
    const _interval = useRef(null); //
    const _isSliding = useRef(false); //
    const _pendingIndex = useRef(null); //
    const animationStage = useRef(0); //

    const selfRef = useRef(null);

    const lastPossibleIndex = countChildren(children) - 1;
    let timeout; //

    console.log('times');


    if (activeIndexProp !== previousActiveIndex) {
        console.log('getderivedstate');

        const nextIndex = Math.max(0, Math.min(activeIndexProp, lastPossibleIndex));

        let _direction;

        if (
            (nextIndex === 0 && previousActiveIndex >= lastPossibleIndex) ||
            previousActiveIndex <= nextIndex
        ) {
            _direction = "next";
        } else {
            _direction = "prev";
        }

        setActiveIndex(nextIndex);
        setPreviousActiveIndex(activeIndexProp);
        setDirection(_direction);
    }

    const safeSetState = (state, setState) => {
        if (isUnmounted.current) return;
        setState(state);
    };

    const select = (index, event, direction) => {
        console.log("select");

        onSelect(
            index,
            direction || (index < activeIndexProp ? "prev" : "next"),
            event
        );
    };

    const handleNext = e => {
        console.log("handleNext");

        if (_isSliding.current) return;

        let index = activeIndexProp + 1;
        const count = countChildren(children);

        if (index > count - 1) {
            if (!wrap) return;

            index = 0;
        }

        select(index, e, "next");
    };

    const handleNextWhenVisible = () => {
        if (
            !isUnmounted.current &&
            !document.hidden &&
            styles(ref, "visibility") !== "hidden"
        ) {
            handleNext();
        }
    };

    const cycle = () => {
        console.log("cycle");

        _isPaused.current = false;

        clearInterval(_interval.current);
        _interval.current = null;

        if (_interval.current && !_isPaused.current) {
            _interval.current = setInterval(
                document.visibilityState ? handleNextWhenVisible : handleNext,
                interval
            );
        }
    };

    const to = (index, event) => {
        if (index < 0 || index > countChildren(children) - 1) {
            return;
        }

        if (_isSliding.current) {
            _pendingIndex.current = index;
            return;
        }

        select(index, event);
    };

    const handleSlideEnd = () => {
        const pendingIndex = _pendingIndex.current;
        _isSliding.current = false;
        _pendingIndex.current = null;

        if (pendingIndex != null) to(pendingIndex);
        else cycle();
    };

    const pause = () => {
        _isPaused.current = true;
        clearInterval(_interval.current);
        _interval.current = null;
    };

    console.log("outside", didMount.current);
    useEffect(() => {
        console.log("inside", didMount.current);
        if (!didMount.current) return;

        if (!slide || activeIndex === previousActiveIndex || _isSliding.current)
            return;

        let orderClassName, directionalClassName;

        if (direction === "next") {
            orderClassName = `${bsPrefix}-item-next`;
            directionalClassName = `${bsPrefix}-item-left`;
        } else if (direction === "prev") {
            orderClassName = `${bsPrefix}-item-prev`;
            directionalClassName = `${bsPrefix}-item-right`;
        }

        _isSliding.current = true;

        pause();

        let nextElement;
        if (animationStage.current === 0) {
            safeSetState("active", setPrevClasses);
            safeSetState(orderClassName, setCurrentClasses);
            animationStage.current++;
        } else if (animationStage.current === 1) {
            const items = selfRef.current.children;
            nextElement = items[activeIndex];
            triggerBrowserReflow(nextElement);
            safeSetState(classNames("active", directionalClassName), setPrevClasses);
            safeSetState(
                classNames(orderClassName, directionalClassName),
                setCurrentClasses
            );
            animationStage.current++;
        } else if (animationStage.current === 2) {
            transitionEnd(nextElement, () => {
                safeSetState("", setPrevClasses);
                safeSetState("active", setCurrentClasses);
                animationStage.current++;

                //  this.safeSetState(
                //    { prevClasses: "", currentClasses: "active" },
                //    this.handleSlideEnd
                //  );
                if (onSlideEnd) {
                    onSlideEnd();
                }
            });
        } else {
            handleSlideEnd();
            animationStage.current = 0;
        }
    });

    useEffect(() => {
        //  isUnmounted.current = false;
        console.log("didmount");

        didMount.current = true;
        cycle();

        return () => {
            console.log("unmount");
            clearTimeout(timeout);
            isUnmounted.current = true;
        };
    }, []);

    // prevClasses: '',
    // currentClasses: 'active',
    // touchStartX: 0,
    // activeIndex,
    //       previousActiveIndex,

    // direction,

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <Component
            {...props}
            className={classNames(
                className,
                prefix,
                slide && "slide",
                fade && `${prefix}-fade`
            )}
        >
            <div className={`${prefix}-inner`} ref={selfRef}>
                {map(children, (child, index) => {
                    const current = index === activeIndex;
                    const previous = index === previousActiveIndex;

                    return cloneElement(child, {
                        className: classNames(
                            child.props.className,
                            current && currentClasses,
                            previous && prevClasses
                        )
                    });
                })}
            </div>
        </Component>
    );
});

Carouselhook.defaultProps = defaultProps;
Carouselhook.Caption = CarouselCaption;
Carouselhook.Item = CarouselItem;
export { Carouselhook };