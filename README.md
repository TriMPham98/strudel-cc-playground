# # 🎵 Strudel.cc Playground

A simple web-based music playground built with [Strudel](https://strudel.cc/), a JavaScript implementation of TidalCycles for live coding music.

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser** and go to `http://localhost:5173`

4. **Click "Play"** to initialize the audio context

5. **Click "Run Pattern"** to play your Strudel patterns!

## How to Use

1. **Start Audio**: Click the "Play" button to initialize the audio context
2. **Write Patterns**: Enter Strudel code in the pattern editor
3. **Run Patterns**: Click "Run Pattern" to start playing your code
4. **Try Examples**: Click on any of the example patterns below the editor to load them
5. **Stop**: Use the "Stop" button to halt playback

## Example Patterns

### Basic Drums

```javascript
s("bd sd bd sd");
```

### Chord Progression

```javascript
s("c3 eb3 g3 bb3").sound("piano").slow(2);
```

### Polyrhythm

```javascript
stack(s("bd*2 sd"), s("hh*8"), s("~ cp ~ cp"));
```

### Melodic Pattern

```javascript
s("c d e f g a b c5").sound("sawtooth").lpf(800).slow(4);
```

## Features

- 🎹 **Pattern Editor**: Write and edit Strudel patterns
- 🎵 **Audio Playback**: Real-time audio synthesis
- 📊 **Simple Visualizer**: Basic waveform visualization
- 📚 **Examples**: Click-to-load example patterns
- 🔧 **Controls**: Play, stop, run, and clear functions

## Learn More

- [Strudel Documentation](https://strudel.cc/)
- [TidalCycles](https://tidalcycles.org/)
- [Pattern Notation Guide](https://strudel.cc/learn/patterns/)

Enjoy making music with code! 🎶
