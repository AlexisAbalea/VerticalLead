function getCurrentScriptName() {
  try {
    throw new Error();
  } catch (err) {
    const stackLines = err.stack.split('\n');
    const callerLine = stackLines[stackLines.length - 1] || stackLines[1];
    return callerLine.match(/(\/|\\)([^\/\\]+\.js)/)[2]; // Extrait le fichier JS
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const scriptTag = document.querySelector(`script[src$='${getCurrentScriptName()}']`);
  // Récupérer l'ID de la vidéo depuis l'attribut data-video-id
  const videoId = scriptTag.getAttribute('data-video-id');

  if (!videoId) {
    return;
  }

  // Construire l'URL de la vidéo
  const videoUrl = `https://vz-d9937b30-2ef.b-cdn.net/${videoId}/play_360p.mp4`;

  // Sélectionner l'élément cible
  playerContainer = document.getElementById('vertical-player');
  if (!playerContainer) {
    return;
  }
  // Créer l'élément vidéo
  const video = document.createElement('video');
  video.src = videoUrl;
  video.style.width = '100%';
  video.style.height = '100%';
  video.style.backgroundColor = '#000';

  // Créer le conteneur principal
  const videoWrapper = document.createElement('div');
  videoWrapper.style.position = 'relative';
  videoWrapper.style.width = '297px';
  videoWrapper.style.height = '550px';
  videoWrapper.style.margin = '0 auto';
  videoWrapper.style.display = 'flex';
  videoWrapper.style.alignItems = 'center';
  videoWrapper.style.justifyContent = 'center';

  // Créer un conteneur pour la vidéo
  const videoContainer = document.createElement('div');
  videoContainer.style.width = '100%';
  videoContainer.style.display = 'flex';
  videoContainer.style.alignItems = 'center';
  videoContainer.style.justifyContent = 'center';

  // Créer le bouton play central
  const playButton = document.createElement('button');
  playButton.innerHTML = playLargeSvg;
  playButton.style.position = 'absolute';
  playButton.style.top = '50%';
  playButton.style.left = '50%';
  playButton.style.transform = 'translate(-50%, -50%)';
  playButton.style.background = 'none';
  playButton.style.border = 'none';
  playButton.style.cursor = 'pointer';
  playButton.style.zIndex = '2';

  // Créer la barre de contrôles
  const controlsBar = document.createElement('div');
  controlsBar.style.position = 'absolute';
  controlsBar.style.bottom = '10px';
  controlsBar.style.left = '0';
  controlsBar.style.right = '0';
  controlsBar.style.background = 'rgba(0, 0, 0, 0.7)';
  controlsBar.style.padding = '5px 10px';
  controlsBar.style.display = 'flex';
  controlsBar.style.alignItems = 'center';
  controlsBar.style.justifyContent = 'space-between';
  controlsBar.style.opacity = '0';
  controlsBar.style.transition = 'opacity 0.3s';
  controlsBar.style.zIndex = '2';
  controlsBar.style.borderBottomLeftRadius = '4px';
  controlsBar.style.borderBottomRightRadius = '4px';

  // Créer le bouton play/pause dans la barre de contrôles
  const playPauseButton = document.createElement('button');
  playPauseButton.innerHTML = playSvg;
  playPauseButton.style.background = 'none';
  playPauseButton.style.border = 'none';
  playPauseButton.style.cursor = 'pointer';

  // Créer le bouton fullscreen
  const fullscreenButton = document.createElement('button');
  fullscreenButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
      </svg>`;
  fullscreenButton.style.background = 'none';
  fullscreenButton.style.border = 'none';
  fullscreenButton.style.cursor = 'pointer';

  // Créer le bouton rouge "bonjour"
  const bonjourButton = document.createElement('button');
  bonjourButton.textContent = 'bonjour';
  bonjourButton.style.position = 'absolute';
  bonjourButton.style.bottom = '50px';
  bonjourButton.style.right = '10px';
  bonjourButton.style.background = '#ff0000';
  bonjourButton.style.color = 'white';
  bonjourButton.style.border = 'none';
  bonjourButton.style.padding = '8px 16px';
  bonjourButton.style.borderRadius = '4px';
  bonjourButton.style.cursor = 'pointer';
  bonjourButton.style.zIndex = '2';
  bonjourButton.style.fontSize = '14px';
  bonjourButton.style.fontWeight = 'bold';
  bonjourButton.style.transition = 'opacity 0.3s';
  bonjourButton.style.opacity = '1';

  // Créer le conteneur de volume
  const volumeContainer = document.createElement('div');
  volumeContainer.style.display = 'flex';
  volumeContainer.style.alignItems = 'center';
  volumeContainer.style.gap = '5px';
  volumeContainer.style.position = 'relative';

  // Créer le bouton de volume
  const volumeButton = document.createElement('button');
  volumeButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
      </svg>`;
  volumeButton.style.background = 'none';
  volumeButton.style.border = 'none';
  volumeButton.style.cursor = 'pointer';

  // Assembler les éléments de volume
  volumeContainer.appendChild(volumeButton);

  // Assembler les éléments
  controlsBar.appendChild(playPauseButton);
  controlsBar.appendChild(volumeContainer);
  controlsBar.appendChild(fullscreenButton);
  controlsBar.style.justifyContent = 'space-between';
  controlsBar.style.gap = '10px';
  fullscreenButton.style.marginLeft = 'auto';
  videoContainer.appendChild(video);
  videoWrapper.appendChild(videoContainer);
  videoWrapper.appendChild(playButton);
  videoWrapper.appendChild(controlsBar);
  videoWrapper.appendChild(bonjourButton);
  playerContainer.appendChild(videoWrapper);

  let isFullscreen = false;
  let isFirstPlay = true;
  let isMobileView = window.innerWidth <= 768;

  // Mettre à jour isMobileView lors du redimensionnement de la fenêtre
  window.addEventListener('resize', () => {
    isMobileView = window.innerWidth <= 768;
  });

  // Gérer le clic sur la vidéo
  video.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playButton.style.display = 'none';
      playPauseButton.innerHTML = pauseSvg;
      if (isFirstPlay) {
        if (isMobileView) {
          enterFullscreen();
        } else {
          videoWrapper.requestFullscreen();
        }
        isFirstPlay = false;
      }
    } else {
      video.pause();
      playButton.style.display = 'block';
      playPauseButton.innerHTML = playSvg;
    }
  });

  // Gérer l'affichage/masquage des contrôles au survol
  videoWrapper.addEventListener('mouseenter', () => {
    controlsBar.style.opacity = '1';
  });

  videoWrapper.addEventListener('mouseleave', () => {
    controlsBar.style.opacity = '0';
  });

  // Gérer le clic sur le bouton play central
  playButton.addEventListener('click', () => {
    video.play();
    playButton.style.display = 'none';
    playPauseButton.innerHTML = pauseSvg;
    if (isFirstPlay) {
      if (isMobileView) {
        enterFullscreen();
      } else {
        videoWrapper.requestFullscreen();
      }
      isFirstPlay = false;
    }
  });

  // Gérer le clic sur le bouton play/pause dans la barre de contrôles
  playPauseButton.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playPauseButton.innerHTML = pauseSvg;
    } else {
      video.pause();
      playPauseButton.innerHTML = playSvg;
    }
  });

  // Gérer l'événement play pour masquer le bouton play central
  video.addEventListener('play', () => {
    playButton.style.display = 'none';
    playPauseButton.innerHTML = pauseSvg;
  });

  // Gérer l'événement pause pour afficher le bouton play central
  video.addEventListener('pause', () => {
    playButton.style.display = 'block';
    playPauseButton.innerHTML = playSvg;
  });

  // Gérer le clic sur le bouton fullscreen
  fullscreenButton.addEventListener('click', () => {
    if (isMobileView) {
      if (isFullscreen) {
        exitFullscreen();
      } else {
        enterFullscreen();
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoWrapper.requestFullscreen();
      }
    }
  });

  // Gérer les changements de fullscreen natif
  videoWrapper.addEventListener('fullscreenchange', () => {
    if (!isMobileView) {
      if (document.fullscreenElement) {
        videoWrapper.style.width = '100vh';
        videoWrapper.style.height = '100vh';
        videoWrapper.style.margin = '0';
        videoContainer.style.width = '100vh';
        videoContainer.style.height = '100vh';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'contain';
        bonjourButton.style.bottom = '60px';
        bonjourButton.style.right = '20px';
      } else {
        videoWrapper.style.width = '297px';
        videoWrapper.style.height = '550px';
        videoWrapper.style.margin = '0 auto';
        videoContainer.style.width = '100%';
        videoContainer.style.height = '100%';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        bonjourButton.style.bottom = '50px';
        bonjourButton.style.right = '10px';
      }
    }
  });

  // Gérer la touche Échap
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isFullscreen && isMobileView) {
      exitFullscreen();
    }
  });

  // Gérer le volume
  volumeButton.addEventListener('click', () => {
    if (video.volume > 0) {
      video.volume = 0;
      volumeButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>`;
    } else {
      video.volume = 1;
      volumeButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>`;
    }
  });

  function enterFullscreen() {
    if (!isFullscreen && isMobileView) {
      isFullscreen = true;
      createOverlay();
      videoWrapper.style.position = 'fixed';
      videoWrapper.style.top = '0';
      videoWrapper.style.left = '0';
      videoWrapper.style.maxWidth = 'none';
      videoWrapper.style.width = '100vw';
      videoWrapper.style.height = '100vh';
      videoWrapper.style.margin = '0';
      videoWrapper.style.display = 'flex';
      videoWrapper.style.alignItems = 'center';
      videoWrapper.style.justifyContent = 'center';
      videoWrapper.style.zIndex = '9999';

      videoContainer.style.width = '100vh';
      videoContainer.style.height = '100vh';
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'contain';

      controlsBar.style.width = '33.33%';
      controlsBar.style.left = '50%';
      controlsBar.style.transform = 'translateX(-50%)';
      controlsBar.style.right = 'auto';

      // Ajuster la position du bouton bonjour en mode plein écran
      bonjourButton.style.bottom = '60px';
      bonjourButton.style.right = '20px';
    }
  }

  function exitFullscreen() {
    if (isFullscreen && isMobileView) {
      isFullscreen = false;
      removeOverlay();
      videoWrapper.style.position = 'relative';
      videoWrapper.style.top = 'auto';
      videoWrapper.style.left = 'auto';
      videoWrapper.style.width = '297px';
      videoWrapper.style.height = '550px';
      videoWrapper.style.margin = '0 auto';
      videoWrapper.style.display = 'flex';
      videoWrapper.style.zIndex = 'auto';

      videoContainer.style.width = '100%';
      videoContainer.style.height = '100%';
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'cover';

      controlsBar.style.width = 'auto';
      controlsBar.style.left = '0';
      controlsBar.style.right = '0';
      controlsBar.style.bottom = '0';
      controlsBar.style.transform = 'none';
      controlsBar.style.padding = '5px 10px';

      // Restaurer la position du bouton bonjour
      bonjourButton.style.bottom = '50px';
      bonjourButton.style.right = '10px';
    }
  }

  function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'video-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.zIndex = '1';
    document.body.appendChild(overlay);
  }

  function removeOverlay() {
    const overlay = document.getElementById('video-overlay');
    if (overlay) {
      overlay.remove();
    }
  }
});

const pauseSvg = `<svg width="18px" height="18px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 1H2V15H7V1Z" fill="#ffffff"/>
<path d="M14 1H9V15H14V1Z" fill="#ffffff"/>
</svg>`;

const playSvg = `<svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	 width="17px" height="17px" viewBox="0 0 163.861 163.861"
	 xml:space="preserve">
<g>
	<path d="M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275
		c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z"/>
</g>
</svg>`;

const playLargeSvg = `<svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	 width="50px" height="50px" viewBox="0 0 163.861 163.861"
	 xml:space="preserve">
<g>
	<path d="M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275
		c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z"/>
</g>
</svg>`;
