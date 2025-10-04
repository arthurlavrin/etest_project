// header and footer 

(function () {
    const prefix = window.location.pathname.includes("/pages/")
        ? ".."
        : ".";

    function loadPart(id, file) {
        return fetch(`${prefix}/components/${file}`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.text();
            })
            .then((html) => {
                const container = document.getElementById(id);
                container.innerHTML = html;

                container
                    .querySelectorAll("[data-src]")
                    .forEach((img) => {
                        img.src = `${prefix}/${img.dataset.src}`;
                    });

                // active menu
                const current = window.location.pathname.replace(
                    /\/$/,
                    ""
                );
                container
                    .querySelectorAll("nav a")
                    .forEach((link) => {
                        const linkPath = new URL(
                            link.href
                        ).pathname.replace(/\/$/, "");
                        if (current.endsWith(linkPath)) {
                            link.classList.add("active");
                        } else {
                            link.classList.remove("active");
                        }
                    });
            })
            .catch((err) =>
                console.error(
                    `Error loading ${file} in ${id}:`,
                    err
                )
            );
    }

    // loading header, footer and auth modal
    loadPart("header", "header.html");
    loadPart("footer", "footer.html");
    loadPart("auth-modal", "auth-modal.html");
})();