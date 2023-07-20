import { base_url } from './apiLinks';

export async function getApartment(id) {
  await fetch(`${base_url}/lodge-connect/apartment/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
}
