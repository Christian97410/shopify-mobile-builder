// src/lib/shopify/product.ts
export async function fetchProducts() {
  const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
  const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

  const endpoint = `https://${domain}/api/2023-10/graphql.json`;

  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            featuredImage {
              url
            }
          }
        }
      }
    }
  `;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();
  return json.data.products.edges.map((edge: any) => edge.node);
}
