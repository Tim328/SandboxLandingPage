async function loadIncludes() {
  const includeElements = document.querySelectorAll("[data-include]");

  await Promise.all(
    [...includeElements].map(async (element) => {
      const file = element.dataset.include;

      try {
        const response = await fetch(file);

        if (!response.ok) {
          throw new Error(`Could not load ${file}`);
        }

        element.innerHTML = await response.text();
      } catch (error) {
        console.error(error);
      }
    })
  );

  document.dispatchEvent(new Event("includesLoaded"));
}

document.addEventListener("DOMContentLoaded", loadIncludes);