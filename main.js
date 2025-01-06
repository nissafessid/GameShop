const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "game-container",
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  };
  
  const game = new Phaser.Game(config);
  let shopContainer;
  
  function preload() {
    // Charger les images d'articles
    for (let i = 1; i <= 10; i++) {
      this.load.image(`item${i}`, `assets/item${i}.png`);
    }
  }
  
  function create() {
    // Créer un conteneur défilable pour la boutique
    shopContainer = this.add.container(100, 50);
  
    let yPosition = 0;
  
    for (let i = 1; i <= 10; i++) {
      // Ajouter une image
      const itemImage = this.add.image(0, yPosition, `item${i}`).setScale(0.5);
  
      // Ajouter un texte
      const itemName = this.add.text(60, yPosition - 10, `Item ${i}`, {
        fontSize: "18px",
        color: "#fff",
      });
  
      // Ajouter un bouton "Acheter"
      const buyButton = this.add.text(200, yPosition - 10, "Buy", {
        fontSize: "18px",
        backgroundColor: "#007bff",
        color: "#fff",
        padding: { x: 10, y: 5 },
      }).setInteractive();
  
      // Gestionnaire d'événements pour le bouton "Acheter"
      buyButton.on("pointerdown", () => {
        alert(`Item ${i} is purchased!`);
        buyButton.setStyle({ backgroundColor: "#28a745" }); // Change the button color to indicate purchase
        buyButton.setText("Purchased"); // Change button text after purchase
        buyButton.setInteractive(false); // Disable the button after purchase
      });
  
      // Ajouter les éléments au conteneur
      shopContainer.add([itemImage, itemName, buyButton]);
  
      yPosition += 100; // Espacement entre les items
    }
  
    // Ajouter un conteneur défilant
    shopContainer.setSize(300, yPosition);
    this.cameras.main.setBounds(0, 0, window.innerWidth, yPosition);
    
    // Gestion de la défilement avec la souris
    this.input.on("pointermove", (pointer) => {
      if (pointer.isDown) {
        shopContainer.y += pointer.velocity.y * 0.1;
        shopContainer.y = Phaser.Math.Clamp(shopContainer.y, -yPosition + 600, 0); // Limiter le défilement
      }
    });
  }
  
  function update() {
    // Mise à jour si nécessaire
  }

  function handleBuyClick(itemName, event) {
    // Animation de l'élément au clic
    const itemElement = event.target.closest('.item');
    if (itemElement) {
      itemElement.style.transition = "transform 0.3s ease";
      itemElement.style.transform = "scale(1.1)"; // Agrandissement temporaire
  
      setTimeout(() => {
        itemElement.style.transform = "scale(1)"; // Retour à la taille normale
      }, 300);
    }
  
    alert(`You clicked Buy for ${itemName}`);
  }
  