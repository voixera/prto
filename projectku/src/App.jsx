import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import DiscordBots from "./Pages/DiscordBots";
import RobloxScripts from "./Pages/RobloxScripts";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { getPlatform, useUiVariant } from "./ui/device";
import MiniAudioPlayer from "./components/MiniAudioPlayer";
import AnimatedWaveBackground from "./components/AnimatedWaveBackground";
import { musicTracks } from "./content/music";
import { ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";

function MusicNoteIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9 18.2V7.1l9-2v10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6.7" cy="18.2" r="2.35" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="15.7" cy="15.2" r="2.35" fill="none" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

function getAppRoute() {
  if (typeof window === "undefined") return "home";
  if (window.location.hash === "#/discord-bots") return "discordBots";
  if (window.location.hash === "#/roblox-scripts") return "robloxScripts";
  return "home";
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
  const [backTopLeaving, setBackTopLeaving] = useState(false);
  const [floatControlsCollapsed, setFloatControlsCollapsed] = useState(false);
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
  const showBackTopRef = useRef(showBackTop);
  const backTopExitTimerRef = useRef(0);

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

    if (playerSnapshot?.track?.title) {
      showNowPlayingToast(
        playerSnapshot.track.title,
        playerSnapshot.total ? `Track ${playerSnapshot.index + 1} of ${playerSnapshot.total}` : "Backsound update"
      );
    }
  }, [playerSnapshot]);

  const handleFloatControlsToggle = useCallback(() => {
    setFloatControlsCollapsed((current) => {
      if (current && playerSnapshot?.track?.title) {
        showNowPlayingToast(
          playerSnapshot.track.title,
          playerSnapshot.total ? `Track ${playerSnapshot.index + 1} of ${playerSnapshot.total}` : "Backsound update"
        );
      }

      return !current;
    });
  }, [playerSnapshot]);

  useEffect(() => {
    if (isMobileUi) import("./ui/mobile/mobile.css");
    if (isTabletUi) import("./ui/tablet/tablet.css");
  }, [isMobileUi, isTabletUi]);

  useEffect(() => {
    if (!entered) return;
    if (isMobileUi || isTabletUi) {
      setFloatControlsCollapsed(true);
    }
  }, [entered, isMobileUi, isTabletUi]);

  useEffect(() => {
    if (!entered) {
      setShowBackTop(false);
      setBackTopLeaving(false);
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
        const shouldShow = readScrollY() > 420;

        if (shouldShow) {
          if (backTopExitTimerRef.current) {
            window.clearTimeout(backTopExitTimerRef.current);
            backTopExitTimerRef.current = 0;
          }
          setBackTopLeaving(false);
          if (!showBackTopRef.current) setShowBackTop(true);
          return;
        }

        if (showBackTopRef.current && !backTopExitTimerRef.current) {
          setShowBackTop(false);
          setBackTopLeaving(true);
          backTopExitTimerRef.current = window.setTimeout(() => {
            setBackTopLeaving(false);
            backTopExitTimerRef.current = 0;
          }, 340);
        }
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
      if (backTopExitTimerRef.current) {
        window.clearTimeout(backTopExitTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    showBackTopRef.current = showBackTop;
  }, [showBackTop]);

  useEffect(() => {
    const onHashChange = () => {
      const nextRoute = getAppRoute();
      const hash = window.location.hash;
      const targetId = hash && !hash.startsWith("#/") ? hash.replace("#", "") : "";

      if (routeRef.current !== "home" && nextRoute === "home" && targetId) {
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
    if (route === "home") return;
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

  const floatTrackTitle = nowPlayingToast.title || playerSnapshot?.track?.title || "";
  const showFloatMusicToast = Boolean(
    entered && nowPlayingToast.visible && !floatControlsCollapsed && floatTrackTitle
  );

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

        <WelcomeScreen
          entered={entered}
          onEnter={handleEnter}
        />

        {entered && (
          <>
            <Navbar />
            <div className="navSpacer" aria-hidden="true" />
            {route === "discordBots" ? (
              <DiscordBots />
            ) : route === "robloxScripts" ? (
              <RobloxScripts />
            ) : (
              <Home />
            )}
            <div
              className={[
                "portfolioFloatControls",
                floatControlsCollapsed ? "isCollapsed" : "",
                showBackTop && !floatControlsCollapsed ? "hasBackTop" : "isBackTopHidden",
                backTopLeaving ? "isBackTopLeaving" : "",
              ].join(" ")}
              aria-label="Portfolio controls"
            >
              <div
                className={`portfolioMusicToast${showFloatMusicToast ? " isVisible" : ""}`}
                role="status"
                aria-live="polite"
                aria-hidden={!showFloatMusicToast}
              >
                <span className="portfolioMusicDisc" aria-hidden="true">
                  <span className="portfolioMusicDiscCenter" />
                </span>
                <span className="portfolioMusicText">
                  <span className="portfolioMusicKicker">Now Playing</span>
                  <span className="portfolioMusicTitle" title={floatTrackTitle}>
                    {floatTrackTitle}
                  </span>
                </span>
              </div>
              <div className="portfolioFloatActions" aria-hidden={floatControlsCollapsed}>
                <button
                  type="button"
                  className={`portfolioFloatBtn portfolioMusicBtn${soundMuted ? " isMuted" : ""}`}
                  onClick={handleSoundToggle}
                  aria-label={soundMuted ? "Turn sound on" : "Turn sound off"}
                  title={soundMuted ? "Turn sound on" : "Turn sound off"}
                  tabIndex={floatControlsCollapsed ? -1 : 0}
                >
                  <MusicNoteIcon />
                </button>
                <button
                  type="button"
                  className={[
                    "portfolioFloatBtn",
                    "portfolioFloatBtnTop",
                    showBackTop ? "isVisible" : "",
                    backTopLeaving ? "isLeaving" : "",
                  ].join(" ")}
                  onClick={handleBackToTop}
                  aria-label="Back to top"
                  title="Back to top"
                  tabIndex={!floatControlsCollapsed && showBackTop ? 0 : -1}
                >
                  <ArrowUp size={20} strokeWidth={2.35} aria-hidden="true" />
                </button>
              </div>
              <button
                type="button"
                className="portfolioFloatBtn portfolioFloatToggle"
                onClick={handleFloatControlsToggle}
                aria-label={floatControlsCollapsed ? "Show portfolio controls" : "Hide portfolio controls"}
                aria-expanded={!floatControlsCollapsed}
                title={floatControlsCollapsed ? "Show controls" : "Hide controls"}
              >
                {floatControlsCollapsed ? (
                  <ChevronLeft size={20} strokeWidth={2.45} aria-hidden="true" />
                ) : (
                  <ChevronRight size={20} strokeWidth={2.45} aria-hidden="true" />
                )}
              </button>
            </div>
            <Footer />
          </>
        )}
      </div>
    </>
  );
}
