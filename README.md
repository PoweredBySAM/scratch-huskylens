# HuskyLens Extension for SAM Scratch

This extension enables you to use the **DFRobot HuskyLens AI camera** in your projects via a **micro:bit** running custom firmware.

---

## Quick Start

### 1. Flash the Micro:bit Firmware
- Download the latest `.hex` file:
  - 👉 [Download micro:bit firmware (binary.hex)](https://github.com/PoweredBySAM/scratch-huskylens/releases/latest/download/binary.hex)
- To program your micro:bit:
  1. Connect via USB.
  2. Drag the `.hex` file into the **MICROBIT** drive that appears.
  3. Wait for the LEDs to finish the flashing animation.

---

### 2. Wire the HuskyLens to Micro:bit (via I²C)
| HuskyLens | micro:bit Pin |
|:---------:|:-------------:|
| SDA       | Pin 20 (SDA)  |
| SCL       | Pin 19 (SCL)  |
| VCC       | 3.3 V         |
| GND       | GND           |

**Important:** Both the HuskyLens **and** the micro:bit must share the same voltage level (3.3 V).

---

### 3. Use the Extension in SAM Scratch

1. Open SAM Scratch.
2. In the **Extensions** panel, add the “HuskyLens” extension, it should automatically add the microbit more extension.
3. Connect your micro:bit with the microbit more extension.
4. Use the blocks to interact with the camera.

---

## Why It Works

- The **micro:bit acts as a bridge**: It runs the custom firmware you flashed to translate Scratch blocks into I²C commands for the HuskyLens.
- Both the **firmware and correct wiring** are mandatory for the extension to function.

---

## 🛠 Troubleshooting

- **Micro:bit not listed?** Try reconnecting or restarting Scratch – your board should appear as a device.
- **HuskyLens not responding?**
  - Recheck SDA/SCL and power connections.
  - Ensure the firmware finished flashing properly.
  - Make sure the HuskyLens is powered on after connecting to the micro:bit.
