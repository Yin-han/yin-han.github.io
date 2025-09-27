// 漂浮菜单逻辑
var timeOut;

class Item {
    constructor(iconPath, backgroundColor, link = null) {
        this.$element = $(document.createElement("div"));
        this.$element.addClass("item");
        this.$element.css("background-color", backgroundColor);

        // 用 <img> 来显示 SVG 图标
        const img = document.createElement("img");
        img.src = iconPath;
        img.alt = "menu icon";
        
        img.style.pointerEvents = "none"; // 避免拖拽时点到图片本身
        this.$element.append(img);

        this.link = link; // 对应的跳转页面
        this.prev = null;
        this.next = null;
        this.isMoving = false;

        const element = this;
        this.$element.on("mousemove", function () {
            clearTimeout(timeOut);
            timeOut = setTimeout(function () {
                if (element.next && element.isMoving) {
                    element.next.moveTo(element);
                }
            }, 10);
        });

        // 点击后跳转页面（如果有 link）
        this.$element.on("mouseup", () => {
            if (!this.isMoving && this.link) {
                window.location.href = this.link;
            }
        });
    }

    moveTo(item) {
        anime({
            targets: this.$element[0],
            left: item.$element.css("left"),
            top: item.$element.css("top"),
            duration: 700,
            elasticity: 500
        });
        if (this.next) {
            this.next.moveTo(item);
        }
    }

    updatePosition() {
        anime({
            targets: this.$element[0],
            left: this.prev.$element.css("left"),
            top: this.prev.$element.css("top"),
            duration: 80
        });
        if (this.next) {
            this.next.updatePosition();
        }
    }
}

class Menu {
    constructor(menu, spacing = 80) {   // 默认间距 80px
        this.$element = $(menu);
        this.first = null;
        this.last = null;
        this.status = "closed";
        this.spacing = spacing;
    }

    add(item, isToggle = false) {
        var menu = this;
        if (this.first == null) {
            this.first = item;
            this.last = item;

            // ⭐ 如果是第一个圆圈（menu.svg），只负责开关，不跳转
            this.first.$element.on("mouseup", function() {
                if (menu.first.isMoving) {
                    menu.first.isMoving = false;        
                } else {
                    menu.click();
                }
            }); 

            item.$element.draggable({
                start: function() {
                    menu.close();
                    item.isMoving = true;
                },
                drag: function() {
                    if (item.next) {
                        item.next.updatePosition();
                    }
                },
                stop: function() {
                    item.isMoving = false;
                    if (item.next) item.next.moveTo(item);
                }
            });
        } else {
            this.last.next = item;
            item.prev = this.last;
            this.last = item;
        }
        this.$element.after(item.$element);
    }

    open() {
        this.status = "open";
        var current = this.first.next;
        var iterator = 1;

        // 用 position() 获取数值，避免 auto
        var baseLeft = this.first.$element.position().left;
        var baseTop = this.first.$element.position().top;

        while (current != null) {
            anime({
                targets: current.$element[0],
                left: baseLeft + (iterator * this.spacing),
                top: baseTop,
                duration: 500
            });
            iterator++;
            current = current.next;
        }    
    }

    close() {
        this.status = "closed";
        var current = this.first.next;
        var baseLeft = this.first.$element.position().left;
        var baseTop = this.first.$element.position().top;

        while (current != null) {
            anime({
                targets: current.$element[0],
                left: baseLeft,
                top: baseTop,
                duration: 500
            });
            current = current.next;
        }
    }

    click() {
        if (this.status == "closed") {
            this.open();
        } else {
            this.close();
        }
    }
}

// 初始化菜单（等intro结束后显示）
$(function(){
    var menu = new Menu("#myMenu", 70);   // 这里改间距

    // 第一个圆圈：menu.svg，只负责展开和收回
    var item0 = new Item("images/menu.svg", "#ffaa00ff");

    // 其他菜单项，对应页面
    var item1 = new Item("images/main.svg", "#00b51bff", "index.html");      // 首页
    var item2 = new Item("images/me.svg", "#d01500ff", "me.html");           // 关于我
    var item3 = new Item("images/projects.svg", "#00487bff", "projects.html"); // 项目
    var item4 = new Item("images/doing.svg", "#898700ff", "doing.html");      // 正在做的

    // 添加菜单项
    menu.add(item0, true);
    menu.add(item1);
    menu.add(item2);
    menu.add(item3);
    menu.add(item4);

    // 延迟显示菜单（假设intro动画持续3秒）
    setTimeout(function(){
        $(".floating-menu").fadeIn();
    }, 500);
});


// menu.js 里修改 fancy-button 包装逻辑
$(function(){
  $(".fancy-button").each(function(){
    const content = $(this).html().trim(); // 保留原始HTML（含文字+icon）
    $(this).empty().append(`
      <div class="fancy-flipper">
        <div class="fancy-front">${content}</div>
        <div class="fancy-back">${content}</div>
      </div>
    `);
  });
});

