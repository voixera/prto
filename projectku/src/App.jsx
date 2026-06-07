import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import DiscordBots from "./Pages/DiscordBots";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { getPlatform, useUiVariant } from "./ui/device";
import MiniAudioPlayer from "./components/MiniAudioPlayer";
import AnimatedWaveBackground from "./components/AnimatedWaveBackground";
import { musicTracks } from "./content/music";
import { ArrowUp, Volume2, VolumeX } from "lucide-react";

function NowPlayingIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 7.5v9m4-11v13m4-9v5m4-7v9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function getAppRoute() {
  if (typeof window === "undefined") return "home";
  return window.location.hash === "#/discord-bots" ? "discordBots" : "home";
}

export default function App() {
  const uiVariant = useUiVariant();
  const platform = useMemo(() => getPlatform(), []);
  const isMobileUi = uiVariant === "mobile";
  const isTabletUi = uiVariant === "tablet";
  const [entered, setEntered] = useState(false);
  const [route, setRoute] = useState(getAppRoute);
  const [pendingSectionScroll, setPendingSectionScroll] = useState("");
  const [showBackTop, setShowBackTop] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const [playerSnapshot, setPlayerSnapshot] = useState(null);
  const [nowPlayingToast, setNowPlayingToast] = useState({
    visible: false,
    title: "",
    detail: "",
  });
  const audioPlayerRef = useRef(null);
  const hideNowPlayingTimerRef = useRef(0);
  const lastAnnouncedTrackIdRef = useRef(null);
  const routeRef = useRef(route);

  const showNowPlayingToast = (title, detail) => {
    if (hideNowPlayingTimerRef.current) {
      window.clearTimeout(hideNowPlayingTimerRef.current);
    }

    setNowPlayingToast({
      visible: true,
      title,
      detail,
    });

    hideNowPlayingTimerRef.current = window.setTimeout(() => {
      setNowPlayingToast((prev) => ({
        ...prev,
        visible: false,
      }));
      hideNowPlayingTimerRef.current = 0;
    }, 4200);
  };

  const handleEnter = useCallback(() => {
    audioPlayerRef.current?.playFromGesture?.({ mutedFallback: true });
    setRoute("home");
    setPendingSectionScroll("");
    setEntered(true);
    if (typeof window !== "undefined") {
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  const handleBackToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSoundToggle = useCallback(() => {
    const nextMuted = audioPlayerRef.current?.toggleSound?.();
    if (typeof nextMuted === "boolean") {
      setSoundMuted(nextMuted);
    }
  }, []);

  useEffect(() => {
    if (isMobileUi) import("./ui/mobile/mobile.css");
    if (isTabletUi) import("./ui/tablet/tablet.css");
  }, [isMobileUi, isTabletUi]);

  useEffect(() => {
    if (!entered) {
      setShowBackTop(false);
      return;
    }

    let rafId = 0;
    const readScrollY = () => {
      const scrollingEl = document.scrollingElement;
      return (
        window.scrollY ||
        scrollingEl?.scrollTop ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        setShowBackTop(readScrollY() > 420);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, { capture: true });
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [entered]);

  useEffect(() => {
    return () => {
      if (hideNowPlayingTimerRef.current) {
        window.clearTimeout(hideNowPlayingTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const nextRoute = getAppRoute();
      const hash = window.location.hash;
      const targetId = hash && !hash.startsWith("#/") ? hash.replace("#", "") : "";

      if (routeRef.current === "discordBots" && nextRoute === "home" && targetId) {
        setPendingSectionScroll(targetId);
      } else {
        setPendingSectionScroll("");
      }

      routeRef.current = nextRoute;
      setRoute(nextRoute);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    routeRef.current = route;
  }, [route]);

  useEffect(() => {
    if (!entered) return;
    if (route !== "discordBots") return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [entered, route]);

  useEffect(() => {
    if (!entered || route !== "home") return;
    if (!pendingSectionScroll || pendingSectionScroll === "top") return;

    const rafId = window.requestAnimationFrame(() => {
      document.getElementById(pendingSectionScroll)?.scrollIntoView({
        block: "start",
        behavior: "auto",
      });
      setPendingSectionScroll("");
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [entered, pendingSectionScroll, route]);

  useEffect(() => {
    if (!entered || !playerSnapshot?.track?.id) return;
    if (lastAnnouncedTrackIdRef.current === playerSnapshot.track.id) return;

    lastAnnouncedTrackIdRef.current = playerSnapshot.track.id;
    showNowPlayingToast(
      playerSnapshot.track.title,
      playerSnapshot.total ? `Track ${playerSnapshot.index + 1} of ${playerSnapshot.total}` : "Backsound update"
    );
  }, [entered, playerSnapshot]);

  return (
    <>
      <AnimatedWaveBackground />

      <div
        id="top"
        className={[
          "app",
          uiVariant === "mobile" ? "uiMobile" : uiVariant === "tablet" ? "uiTablet" : "uiDesktop",
          platform === "ios" ? "platformIOS" : platform === "android" ? "platformAndroid" : "",
          !entered ? "welcomeActive" : "",
          entered ? "portfolioEntered" : "",
        ].join(" ")}
      >
        <MiniAudioPlayer
          ref={audioPlayerRef}
          tracks={musicTracks}
          autoPlay={entered}
          onTrackChange={(track, meta) => {
            setPlayerSnapshot({
              track,
              index: meta?.index ?? 0,
              total: meta?.total ?? musicTracks.length,
            });
          }}
          onPlaybackChange={(state) => {
            setSoundMuted(Boolean(state?.muted));
          }}
        />

        <div
          className={`nowPlayingToast${entered && nowPlayingToast.visible ? " isVisible" : ""}`}
          role="status"
          aria-live="polite"
          aria-hidden={!entered || !nowPlayingToast.visible}
        >
          <div className="nowPlayingToastKicker">
            <span className="nowPlayingToastIcon" aria-hidden="true">
              <NowPlayingIcon />
            </span>
            <span>Now Playing</span>
          </div>
          <p className="nowPlayingToastTitle" title={nowPlayingToast.title}>
            {nowPlayingToast.title}
          </p>
          <p className="nowPlayingToastDetail">{nowPlayingToast.detail}</p>
        </div>

        <WelcomeScreen
          entered={entered}
          onEnter={handleEnter}
        />

        {entered && (
          <>
            <Navbar />
            <div className="navSpacer" aria-hidden="true" />
            {route === "discordBots" ? <DiscordBots /> : <Home />}
            <div className="portfolioFloatControls" aria-label="Portfolio controls">
              <button
                type="button"
                className="portfolioFloatBtn"
                onClick={handleSoundToggle}
                aria-label={soundMuted ? "Turn sound on" : "Turn sound off"}
                title={soundMuted ? "Turn sound on" : "Turn sound off"}
              >
                {soundMuted ? (
                  <VolumeX size={20} strokeWidth={2.25} aria-hidden="true" />
                ) : (
                  <Volume2 size={20} strokeWidth={2.25} aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                className={[
                  "portfolioFloatBtn",
                  "portfolioFloatBtnTop",
                  showBackTop ? "isVisible" : "",
                ].join(" ")}
                onClick={handleBackToTop}
                aria-label="Back to top"
                title="Back to top"
                tabIndex={showBackTop ? 0 : -1}
              >
                <ArrowUp size={20} strokeWidth={2.35} aria-hidden="true" />
              </button>
            </div>
            <Footer />
          </>
        )}
      </div>
    </>
  );
}
