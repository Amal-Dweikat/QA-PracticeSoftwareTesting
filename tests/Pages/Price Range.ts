import { Page, Locator, expect } from '@playwright/test';

export class PriceRangePage {
  readonly page: Page;

  readonly minHandle: Locator;
  readonly maxHandle: Locator;

  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;

    // slider handles
    this.minHandle = page.locator('span.ngx-slider-pointer.ngx-slider-pointer-min');
    this.maxHandle = page.locator('span.ngx-slider-pointer.ngx-slider-pointer-max');

    // ✅ prices (زي زميلك)
    this.productPrices = page.locator('[data-test="product-price"]');
  }

  async goto() {
    await this.page.goto('/');
    // ✅ استني المنتجات
    await expect(this.productPrices.first()).toBeVisible({ timeout: 15000 });
  }

  async getPrices(): Promise<number[]> {
    // ✅ استني شوي لضمان وجود عناصر
    await expect(this.productPrices.first()).toBeVisible({ timeout: 15000 });

    const texts = await this.productPrices.allTextContents();
    return texts
      .map(t => Number(t.replace('$', '').trim()))
      .filter(n => !Number.isNaN(n));
  }

  async moveSlider(minOffset: number, maxOffset: number) {
    // drag min handle
    const minBox = await this.minHandle.boundingBox();
    if (!minBox) throw new Error('Min slider handle not found');

    await this.page.mouse.move(minBox.x + minBox.width / 2, minBox.y + minBox.height / 2);
    await this.page.mouse.down();
    await this.page.mouse.move(minBox.x + minBox.width / 2 + minOffset, minBox.y + minBox.height / 2);
    await this.page.mouse.up();

    // drag max handle
    const maxBox = await this.maxHandle.boundingBox();
    if (!maxBox) throw new Error('Max slider handle not found');

    await this.page.mouse.move(maxBox.x + maxBox.width / 2, maxBox.y + maxBox.height / 2);
    await this.page.mouse.down();
    await this.page.mouse.move(maxBox.x + maxBox.width / 2 - maxOffset, maxBox.y + maxBox.height / 2);
    await this.page.mouse.up();

    // ✅ استني الصفحة “تستقر” بعد الفلترة
    await this.page.waitForLoadState('networkidle');
  }
}
