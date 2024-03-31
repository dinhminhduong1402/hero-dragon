const app = () => {
  // Thông tin sinh viên
  let name = "Đinh Minh Dương";
  let id = "31211023119";
  console.log(name + " - " + id);

  // --------BÀI LÀM------------

  // tạo lớp nhân vật (OOP)
  class Characters {
    constructor(level, xp, skillPoints) {
      this.level = level;
      this.xp = xp;
      this.skillPoints = skillPoints;
      this.health = 200;
      this.strength = 0.6 * skillPoints + 0.1 * xp;
      this.agi = Math.floor(0.2 * skillPoints + 0.2 * xp);
      this.intel = 0.2 * skillPoints + 10 * level;
    }

    nextAgi() {
      this.agi = Math.floor(Math.random() * 100);
    }
  }

  // đối tượng hero
  let Hero_level = 1;
  let Hero_xp = 120;
  let Hero_skillPoints = 5;
  const Hero = new Characters(Hero_level, Hero_xp, Hero_skillPoints);

  // lựa chọn cấp độ, quyết định các thông số chiến đấu
  // nhập tên
  let yourName = prompt("Hãy nhập tên bạn");
  if (yourName == name) {
    console.log(`Chính xác! Bạn có trí nhớ rất tốt! skillPoints +5!`);
    Hero.skillPoints += 5;
  } else {
    console.log(`Tệ thật! Tên chính mình mà không nhớ sao?! skillPoints -5!`);
    Hero.skillPoints -= 5;
  }
  // chọn cấp độ
  let type = prompt(
    "Bạn muốn chọn phân cấp nào? a: Chiến Binh | b: Sát Thủ | c: Thợ Săn"
  );
  switch (type) {
    case "a":
      console.log("Cấp độ hiện tại của bạn là: Chiến binh");
      Hero.level = 4;
      Hero.strength += 10;
      Hero.agility -= 10;
      break;
    case "b":
      console.log("Cấp độ hiện tại của bạn là: Sát thủ");
      Hero.level = 3;
      Hero.strength -= 10;
      Hero.agility += 5;
      Hero.intel += 5;
      break;
    case "c":
      console.log("Cấp độ hiện tại của bạn là: Thợ săn");
      Hero.level = 2;
      Hero.strength -= 10;
      Hero.intel += 10;
      break;
    default:
      break;
  }
  // in thông tin anh hùng ra giao diện
  function printHeroInfo() {
    const $Hero_level = document.querySelector("#hero-level");
    const $Hero_xp = document.querySelector("#hero-xp");
    const $Hero_skillPoints = document.querySelector("#hero-skill-points");
    const $Hero_health = document.querySelector("#hero-health");
    const $Hero_strength = document.querySelector("#hero-strength");
    const $Hero_agi = document.querySelector("#hero-agi");
    const $Hero_intel = document.querySelector("#hero-intel");

    $Hero_level.innerText = `Level: ${Hero.level}`;
    $Hero_xp.innerText = `Xp: ${Hero.xp}`;
    $Hero_skillPoints.innerText = `Skill Points: ${Hero.skillPoints}`;
    $Hero_health.innerText = `Health: ${Hero.health}`;
    $Hero_strength.innerText = `Strength: ${Hero.strength}`;
    $Hero_agi.innerText = `Agi: ${Hero.agi}`;
    $Hero_intel.innerText = `Intel: ${Hero.intel}`;
  }
  printHeroInfo();

  // đối tượng dragon
  let Dragon_level = 1;
  let Dragon_xp = 120;
  let Dragon_skillPoints = 5;
  const Dragon = new Characters(Dragon_level, Dragon_xp, Dragon_skillPoints);
  // in thông tin rồng ra giao diện
  function printDragonInfo() {
    const $Dragon_level = document.querySelector("#dragon-level");
    const $Dragon_xp = document.querySelector("#dragon-xp");
    const $Dragon_skillPoints = document.querySelector("#dragon-skill-points");
    const $Dragon_health = document.querySelector("#dragon-health");
    const $Dragon_strength = document.querySelector("#dragon-strength");
    const $Dragon_agi = document.querySelector("#dragon-agi");
    const $Dragon_intel = document.querySelector("#dragon-intel");

    $Dragon_level.innerText = `Level: ${Dragon.level}`;
    $Dragon_xp.innerText = `Xp: ${Dragon.xp}`;
    $Dragon_skillPoints.innerText = `Skill Points: ${Dragon.skillPoints}`;
    $Dragon_health.innerText = `Health: ${Dragon.health}`;
    $Dragon_strength.innerText = `Strength: ${Dragon.strength}`;
    $Dragon_agi.innerText = `Agi: ${Dragon.agi}`;
    $Dragon_intel.innerText = `Intel: ${Dragon.intel}`;
  }
  printDragonInfo();

  // Hàm tạo thông báo, gỡ thông báo né đòn, sát thương chí mạng
  function printNotice(notice) {
    let noticeContent = notice;
    const $notice = document.createElement("p");
    $notice.id = "notice";
    $notice.innerText = noticeContent;

    const $play_ground = document.querySelector("#playground");
    $play_ground.appendChild($notice);
  }
  function removeNotice() {
    document.querySelector("#notice").remove();
  }

  // hàm kết thúc game
  function endGame() {
    if (Dragon.health <= 0 || Hero.health <= 0) {
      // xóa thông báo trước đó
      if (document.querySelector("#notice")) {
        removeNotice();
      }
      if (Dragon.health > Hero.health) {
        printNotice("RỒNG ĐÃ DÀNH CHIẾN THẮNG!");
      }
      if (Dragon.health < Hero.health){
        printNotice("ANH HÙNG ĐÃ DÀNH CHIẾN THẮNG!");
      }

      const $Hero_attack = document.querySelector('#hero-attack')
      const $Dragon_attack = document.querySelector('#dragon-attack')
      console.log($Hero_attack)
      $Hero_attack.addEventListener("click", () => {console.log("Game đã kết thúc. Tải lại trang để chơi mới!")});
      $Dragon_attack.addEventListener("click", () => {console.log("Game đã kết thúc. Tải lại trang để chơi mới")});
    }
  }

  // Tạo hàm thực hiện tấn công
  function heroAttack() {
    // hiệu ứng khi anh hùng tấn công
    const $hero_img = document.querySelector("#hero-img");
    $hero_img.classList.add("shake");
    setTimeout(() => {
      $hero_img.classList.remove("shake");
    }, 1500);

    if (document.querySelector("#notice")) {
      removeNotice();
    }

    if (Hero.agi < Dragon.agi) {
      printNotice("Rồng đã né đòn thành công!");
    } else if (Hero.intel > Math.random() * 100) {
      Dragon.health -= Hero.strength * 2;
      printNotice("Rồng chịu sát thương chí mạng!");
    } else {
      Dragon.health -= Hero.strength;
    }

    // reset UI
    Dragon.nextAgi();
    Hero.nextAgi();
    printDragonInfo();
    printHeroInfo();

    endGame();
  }

  function dragonAttack() {
    // hiệu ứng khi rồng tấn công
    const $dragon_img = document.querySelector("#dragon-img");
    setTimeout(() => {
      $dragon_img.classList.remove("shake");
    }, 1500);
    $dragon_img.classList.add("shake");

    // xóa thông báo trước đó
    if (document.querySelector("#notice")) {
      removeNotice();
    }

    if (Dragon.agi < Hero.agi) {
      printNotice("Anh hùng đã né đòn thành công!");
    } else if (Dragon.intel > Math.random() * 100) {
      Hero.health -= Dragon.strength * 2;
      printNotice("Anh hùng chịu sát thương chí mạng!");
    } else {
      Hero.health -= Dragon.strength;
    }
    // reset UI
    Dragon.nextAgi();
    Hero.nextAgi();
    printDragonInfo();
    printHeroInfo();

    endGame();
  }

  // Xử lí nút tấn công
  const $Hero_attack = document.querySelector("#hero-attack");
  const $Dragon_attack = document.querySelector("#dragon-attack");

  $Hero_attack.addEventListener("click", heroAttack);
  $Dragon_attack.addEventListener("click", dragonAttack);
};

app();
