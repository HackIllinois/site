"""Encode registration stage SVG/PNG sources to static WebP + AVIF + LQIP.

Output naming matches modules/RegistrationBackgrounds.ts:
  {id}-1280.webp / {id}-2560.webp
  {id}-1280.avif / {id}-2560.avif

Requires ImageMagick (`magick`) with SVG/WebP/AVIF support.
"""

from __future__ import annotations

import base64
import json
import os
import subprocess

repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
bg_dir = os.path.join(repo_root, "public", "registration", "backgrounds")
out_dir = os.path.join(bg_dir, "webp")
os.makedirs(out_dir, exist_ok=True)

targets = [
    ("personal_info", "personal_info.svg", True),
    ("canyon_background_info", "canyon_background_info.png", False),
    ("app_questions", "app_questions.svg", True),
    ("attending_hack", "attending_hack.svg", True),
    ("review", "review.svg", True),
    ("confirmation", "confirmation.svg", True),
    ("auth", "auth.svg", True),
]

results: dict[str, dict] = {}

for name, filename, is_svg in targets:
    src = os.path.join(bg_dir, filename)
    src_size = os.path.getsize(src)

    w1_webp = os.path.join(out_dir, f"{name}-1280.webp")
    w2_webp = os.path.join(out_dir, f"{name}-2560.webp")
    w1_avif = os.path.join(out_dir, f"{name}-1280.avif")
    w2_avif = os.path.join(out_dir, f"{name}-2560.avif")

    subprocess.run(
        ["magick", src, "-resize", "1280x", "-quality", "82", w1_webp],
        check=True,
    )
    if is_svg:
        subprocess.run(
            [
                "magick",
                "-density",
                "192",
                src,
                "-resize",
                "2560x",
                "-quality",
                "80",
                w2_webp,
            ],
            check=True,
        )
    else:
        subprocess.run(
            ["magick", src, "-resize", "2560x", "-quality", "80", w2_webp],
            check=True,
        )

    subprocess.run(
        ["magick", src, "-resize", "1280x", "-quality", "52", w1_avif],
        check=True,
    )
    if is_svg:
        subprocess.run(
            [
                "magick",
                "-density",
                "192",
                src,
                "-resize",
                "2560x",
                "-quality",
                "52",
                w2_avif,
            ],
            check=True,
        )
    else:
        subprocess.run(
            ["magick", src, "-resize", "2560x", "-quality", "52", w2_avif],
            check=True,
        )

    lqip_tmp = os.path.join(out_dir, f"{name}_lqip.webp")
    subprocess.run(
        ["magick", src, "-resize", "24x", "-quality", "45", lqip_tmp],
        check=True,
    )
    with open(lqip_tmp, "rb") as f:
        lqip_bytes = f.read()
    os.remove(lqip_tmp)
    lqip_b64 = "data:image/webp;base64," + base64.b64encode(lqip_bytes).decode()

    results[name] = {
        "src_file": filename,
        "src_size": src_size,
        "webp_1x": os.path.getsize(w1_webp),
        "webp_2x": os.path.getsize(w2_webp),
        "avif_1x": os.path.getsize(w1_avif),
        "avif_2x": os.path.getsize(w2_avif),
        "lqip_len": len(lqip_b64),
        "lqip_b64": lqip_b64,
    }
    print(
        f"Done {name:24}: orig={src_size/1024:7.1f}KB | "
        f"webp1x={results[name]['webp_1x']/1024:5.1f}KB | "
        f"avif1x={results[name]['avif_1x']/1024:5.1f}KB"
    )

json_out = os.path.join(repo_root, "scripts", "backgrounds_manifest.json")
with open(json_out, "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)

print("\nSaved manifest to:", json_out)
